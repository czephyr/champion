let itemsHere: HTMLElement | null = document.getElementById("items-here");
let loader: HTMLElement | null = document.getElementById("loader");
let filterButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("filterButton");
let itemN = document.getElementById("itemN");

interface Product {
	id: number;
	price: number;
	text: string;
	name: string;
	category: string;
	img250: string;
}

interface JSONResponse {
	data: Array<Product>;
	status: number;
}

interface ProductResponse {
	data: Array<Product>;
	status: number;
}

interface intJSONREsponse {
	data: Array<number>;
	status: number;
	msg: string;
}

if (itemsHere) {
	itemsHere.addEventListener("click", setClickBehaviour);
}

function setClickBehaviour(e: Event) {
	if (e.target) {
		// @ts-ignore
		if ((<HTMLElement>e.target).parentElement.id === "add-to-cart-btn") {
			addToCart2(parseInt((<HTMLElement>e.target).closest(".card").id)).then(r => {
				let num = localStorage.getItem("cartN");
				localStorage.removeItem("cartN");
				localStorage.setItem("cartN", "" + (parseInt(num) + 1));
				location.reload();
				return;
			});
		} else if ((<HTMLElement>e.target).closest(".card").id) {
			// @ts-ignore
			window.location.href = '/demo_war_exploded/productpage.html?productID=' + (<HTMLElement>e.target).closest(".card").id;
		} else if ((<HTMLElement>e.target).id === "items-here") {
			return;
		}


	}
}

async function filterCatalogue() {
	if (loader) {
		loader.style.display = "inline-block";
	}
	let searchBar: HTMLInputElement | null = <HTMLInputElement>document.getElementById("searchBar");
	let orderDropdown: HTMLSelectElement | null = <HTMLSelectElement>document.getElementById("order");

	let name = searchBar.value ?? "";
	let order = orderDropdown.value ?? "";

	const reducer = (accumulator: string, item: Product) => accumulator + `<div class="card card-catalogue" id="${item.id}">
                <button class="add-to-cart-btn" id="add-to-cart-btn">
                    <i class="fas fa-plus-circle"></i>
                </button>
                <img src="https://via.placeholder.com/250x250" alt="" />
                <div class="item-description">
                    <span>${item.name}</span><span>${item.price}$</span>
                </div>
            </div>`


	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=filter&NAME=" + name + "&ORDER=" + order);
	const JsonObj: JSONResponse = await res.json();


	const result: string = JsonObj.data.reduce(reducer, "");
	if (itemN) {
		itemN.innerText = JsonObj.data.length + " products";
	}
	if (itemsHere) {
		itemsHere.innerHTML = result;
	}
}

filterButton.addEventListener("click", filterCatalogue);

async function loadFullCatalogue() {
	const reducer = (accumulator: string, item: Product) => accumulator + `
							<div class="card card-catalogue" id="${item.id}">
                <button class="add-to-cart-btn" id="add-to-cart-btn">
                    <i class="fas fa-plus-circle"></i>
                </button>
                <img src="http://localhost:8080/demo_war_exploded/sources/images/${item.img250}.png" alt="" />
                <div class="item-description">
                    <span>${item.name}</span><span>${item.price}$</span>
                </div>
            </div>`

	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=all");
	const JsonObj: JSONResponse = await res.json();
	if (itemN) {
		itemN.innerText = JsonObj.data.length + " products";
	}
	return JsonObj.data.reduce(reducer, "");
}

window.addEventListener("DOMContentLoaded", () => {
	loadFullCatalogue().then(result => {
		if (loader && itemsHere) {
			loader.style.display = "none";
			itemsHere.innerHTML = result;
		}
	});
});

async function addToCart2(id: number) {
	const checkRes: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=check&ID=" + localStorage.getItem("userID"));
	const checkJsonObj: intJSONREsponse = await checkRes.json();

	if (checkJsonObj.data && checkJsonObj.data.includes(id)) {
		const ures: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=update&ID=" + localStorage.getItem("userID") + "&item=" + id);
		const uJsonObj: ProductResponse = await ures.json();
		return;
	}

	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=add&ID=" + localStorage.getItem("userID") + "&item=" + id);
	const JsonObj: ProductResponse = await res.json();
}