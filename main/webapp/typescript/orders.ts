import {orderArrayReponse} from "../models/responses";

let ordersSpace: HTMLElement | null = document.getElementById("orders");
let loader: HTMLElement | null = document.getElementById("loader");
let itemN = document.getElementById("itemN");
let reviewCard = document.getElementById("reviewPopup");
let reviewSuggestion = document.getElementById("reviewSuggestion");
let closeReview = document.getElementById("closeReviewPopUp");


closeReview.addEventListener("click", () => {
	reviewCard.classList.remove("loginOpen");
});

if (ordersSpace) {
	ordersSpace.addEventListener("click", setClickBehaviour);
}

function setClickBehaviour(e: Event) {
	if (e.target) {
		if ((<HTMLElement>e.target).classList.contains("fas")) {
			reviewCard.classList.add("loginOpen");
			// @ts-ignore
			reviewSuggestion.innerText = ("Review your " + e.target.parentElement.parentElement.parentElement.parentElement.children[0].textContent);

		}
		if ((<HTMLElement>e.target).parentElement.tagName === "TR") {
			// @ts-ignore
			window.location.href = '/demo_war_exploded/productpage.html?productID=' + (<HTMLElement>e.target).parentNode.children[0].attributes.productID.value;
		}
	}
}

async function loadOrders() {

	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "CustomerServlet" + "?ACTION=orders&id=" + localStorage.getItem("userID"));
	const JsonObj: orderArrayReponse = await res.json();
	if (itemN) {
		itemN.innerText = JsonObj.data.length + " orders";
	}

	let resultString = "";
	JsonObj.data.forEach(function (order) {
		let productsString = "";
		let total = 0;
		order.ordered.forEach((product) => {
			total = total + (product.price * product.quantity);
			productsString = productsString + `
			<tr>
				<td productID=${product.product_id}>${product.name}</td>
				<td>x${product.quantity}</td>
				<td>$ ${product.price * product.quantity}</td>
				<td><input type="hidden" value="${product.product_id}" id="idvalue"></td>
			</tr>`
		});
		resultString = resultString + `<div class="order">
						<div class="category-title item-description">Order code#${order.id}</div>
						<table class="order-table">
						<thead>
							<tr>
						<th>Items</th>
						<th>Quantity</th>
						<th>Price</th>
						</tr>
						</thead>
						<tbody>` + productsString
			+ `<tr>
							<td></td>
							<td></td>
							<td></td>
							<td>total:$${total}</td>
						</tr>
						
						</tbody>
						</table>
						</div>`;
	});

	return resultString;
}

window.addEventListener("DOMContentLoaded", () => {
	loadOrders().then(result => {
		if (loader && ordersSpace) {
			loader.style.display = "none";
			ordersSpace.innerHTML = result;
		}
	});
});
