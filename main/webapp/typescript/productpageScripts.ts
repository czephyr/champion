import {Product} from "../models/product";
import {Review} from "../models/review";

import {reviewArrayResponse, ArrayProductResponse, intArrayResponse} from "../models/responses";


let itemsHere: HTMLElement | null = document.getElementById("product-zone");
let loader: HTMLElement | null = document.getElementById("loader");

let reviews: HTMLElement | null = document.getElementById("reviews");
let loader2: HTMLElement | null = document.getElementById("loader2");

const currentProductID = (new URLSearchParams(window.location.search)).get('productID');

async function loadProduct() {
	const reducer = (accumulator: string, item: Product) => accumulator +
		`<img src="https://via.placeholder.com/550x550" alt=""/>
	<div class="column">
		<h1 class="product-name">${item.name}</h1>
		<h2 class="product-info1">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, qui.
		</h2>
		<div class="product-descr">
			${item.text}
		</div>
	</div>`
	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=byID&PRODUCTID=" + currentProductID);
	const JsonObj: ArrayProductResponse = await res.json();
	return JsonObj.data[0];
}

async function loadReviews() {
	const reducer2 = (accumulator: string, review: Review) => accumulator +
		`<div class="card card-section">
																		<div class="column">
																			<div class="category-title item-description">${review.customerName}</div>
																			<div class="item-description">${review.text}</div>
																		</div>
																	</div>`

	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "ReviewServlet" + "?PRODUCTID=" + currentProductID);
	const JsonObj: reviewArrayResponse = await res.json();
	return JsonObj.data.reduce(reducer2, "");
}

async function addToCart(id: number) {
	const checkRes: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=check&ID=" + localStorage.getItem("userID"));
	const checkJsonObj: intArrayResponse = await checkRes.json();

	if (checkJsonObj.data && checkJsonObj.data.indexOf(id)) {
		const ures: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=update&ID=" + localStorage.getItem("userID") + "&item=" + id);
		const uJsonObj: ArrayProductResponse = await ures.json();
		return;
	}

	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=add&ID=" + localStorage.getItem("userID") + "&item=" + id);
	const JsonObj: ArrayProductResponse = await res.json();
}

window.addEventListener("DOMContentLoaded", () => {
	loadProduct().then(result => {
		if (loader && itemsHere) {
			loader.style.display = "none";

			let itemDiv = document.createElement("div");
			itemDiv.setAttribute("class", "column");
			itemDiv.innerHTML = `
	<div class="column">
		<h1 class="product-name">${result.name}</h1>
		<h2 class="product-info1">
		${result.category}
		</h2>
		<div class="product-descr">
			${result.text}
		</div>
		<h2>${result.price}$</h2>
	</div>`;

			let addToCartBtn = document.createElement("a");
			addToCartBtn.innerText = "Buy";
			addToCartBtn.setAttribute("class", "btn");
			addToCartBtn.addEventListener("click", () => {
				addToCart(result.id).then(() => {
					let num = localStorage.getItem("cartN");
					localStorage.removeItem("cartN");
					localStorage.setItem("cartN", "" + (parseInt(num) + 1));
					location.reload();
				});
			});

			itemDiv.appendChild(addToCartBtn);
			itemsHere.innerHTML = `<img src="http://localhost:8080/demo_war_exploded/sources/images/${result.img550}.png"" alt=""/>`;
			itemsHere.appendChild(itemDiv);
		}
	});

	loadReviews().then(result => {
		if (loader2 && reviews) {
			loader2.style.display = "none";
			reviews.innerHTML = result;
		}
	});
});
