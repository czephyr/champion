import {Product} from "../models/product";

import {ArrayProductResponse, intArrayResponse} from "../models/responses";


let top3row: HTMLElement | null = document.getElementById("top3");
let top3loader: HTMLElement | null = document.getElementById("top3loader");

if (top3row) {
	top3row.addEventListener("click", thisFunction)
}


function thisFunction(e: Event) {
	if (e.target) {

		// @ts-ignore
		if ((<HTMLElement>e.target).parentElement.id === "add-to-cart-btn") {
			addToCart1(parseInt((<HTMLElement>e.target).closest(".card").id)).then(r => {
				let num = localStorage.getItem("cartN");
				localStorage.removeItem("cartN");
				localStorage.setItem("cartN", "" + (parseInt(num) + 1));
				location.reload();
				return;
			});
		} else if ((<HTMLElement>e.target).closest(".card").id) {

			// @ts-ignore
			window.location.href = '/demo_war_exploded/productpage.html?productID=' + (<HTMLElement>e.target).closest(".card").id;
		}

	}
}


async function loadProducts() {
	const reducer = (accumulator: string, item: Product) => accumulator +
		`<div class="card" id="${item.id}">
											<button class="add-to-cart-btn" id="add-to-cart-btn">
                    		<i class="fas fa-plus-circle"></i>
                			</button>
											<img src="http://localhost:8080/demo_war_exploded/sources/images/${item.img250}.png"" alt=""/>
											<div class="item-description">
												<span>${item.name}</span><span>${item.price}$</span>
											</div>
										</div>`

	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=top3");
	const JsonObj: ArrayProductResponse = await res.json();
	return JsonObj.data.reduce(reducer, "");
}

window.addEventListener("DOMContentLoaded", () => {
	loadProducts().then(result => {
		if (top3loader && top3row) {
			top3loader.style.display = "none";
			top3row.innerHTML = result;
		}
	});
});

async function addToCart1(id: number) {
	const checkRes: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=check&ID=" + localStorage.getItem("userID"));
	const checkJsonObj: intArrayResponse = await checkRes.json();

	// @ts-ignore
	if (checkJsonObj.data && checkJsonObj.data.includes(id)) {
		const ures: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=update&ID=" + localStorage.getItem("userID") + "&item=" + id);
		const uJsonObj: ArrayProductResponse = await ures.json();
		return;
	}

	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=add&ID=" + localStorage.getItem("userID") + "&item=" + id);
	const JsonObj: ArrayProductResponse = await res.json();
}
