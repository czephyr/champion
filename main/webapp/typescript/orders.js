"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let ordersSpace = document.getElementById("orders");
let loader = document.getElementById("loader");
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
function setClickBehaviour(e) {
    if (e.target) {
        if (e.target.classList.contains("fas")) {
            reviewCard.classList.add("loginOpen");
            reviewSuggestion.innerText = ("Review your " + e.target.parentElement.parentElement.parentElement.parentElement.children[0].textContent);
        }
        if (e.target.parentElement.tagName === "TR") {
            window.location.href = '/demo_war_exploded/productpage.html?productID=' + e.target.parentNode.children[0].attributes.productID.value;
        }
    }
}
function loadOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "CustomerServlet" + "?ACTION=orders&id=" + localStorage.getItem("userID"));
        const JsonObj = yield res.json();
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
			</tr>`;
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
    });
}
window.addEventListener("DOMContentLoaded", () => {
    loadOrders().then(result => {
        if (loader && ordersSpace) {
            loader.style.display = "none";
            ordersSpace.innerHTML = result;
        }
    });
});
