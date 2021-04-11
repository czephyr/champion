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
let cart = document.getElementById("cart");
let cartitemsHere = document.getElementById("itemsSpace");
let cartLoader = document.getElementById("cartLoader");
let btnSpace = document.getElementById("btnSpace");
window.addEventListener("DOMContentLoaded", () => {
    let openCartButton = document.getElementById("openCartButton");
    openCartButton === null || openCartButton === void 0 ? void 0 : openCartButton.addEventListener("click", cartPopup);
});
function cartPopup() {
    if (cart === null || cart === void 0 ? void 0 : cart.classList.contains("cartOpen")) {
        cart.classList.remove("cartOpen");
        return;
    }
    let total = 0;
    cart === null || cart === void 0 ? void 0 : cart.classList.add("cartOpen");
    let lastRow = document.createElement("tr");
    lastRow.insertCell(0);
    lastRow.insertCell(1);
    let totalCell = lastRow.insertCell(2);
    lastRow.insertCell(3);
    loadCart().then(products => {
        // @ts-ignore
        cartLoader.style.display = "none";
        // @ts-ignore
        cartitemsHere.innerText = "";
        if (products) {
            products.forEach((product) => {
                let row = document.createElement("tr");
                total = total + product.price * product.quantity;
                let nameCell = row.insertCell(0);
                nameCell.innerText = "" + product.name;
                nameCell.addEventListener("click", () => {
                    window.location.href = '/demo_war_exploded/productpage.html?productID=' + product.id;
                });
                row.insertCell(1).innerText = "" + product.quantity;
                row.insertCell(2).innerText = "" + product.price + "$";
                let div = document.createElement("div");
                div.setAttribute("class", "review-button");
                let button = document.createElement("button");
                button.setAttribute("class", "review-button add-delete-button");
                let i = document.createElement("i");
                i.setAttribute("class", "fas fa-times");
                button.appendChild(i);
                div.appendChild(button);
                let removeButton = row.insertCell(3);
                removeButton.appendChild(div);
                removeButton.addEventListener("click", () => {
                    removeFromCart(product.id).then(() => { var _a; return (_a = removeButton.closest("tr")) === null || _a === void 0 ? void 0 : _a.remove(); });
                    let num = localStorage.getItem("cartN");
                    localStorage.removeItem("cartN");
                    localStorage.setItem("cartN", "" + (parseInt(num) - product.quantity));
                    totalCell.innerText = "total: " + (total - product.price * product.quantity) + "$";
                    location.reload();
                });
                cartitemsHere === null || cartitemsHere === void 0 ? void 0 : cartitemsHere.appendChild(row);
            });
        }
        totalCell.innerText = "total: " + total + "$";
        cartitemsHere === null || cartitemsHere === void 0 ? void 0 : cartitemsHere.appendChild(lastRow);
        if (total > 0) {
            let buyBtn = document.createElement("a");
            buyBtn.innerText = "buy";
            buyBtn.setAttribute("class", "btn");
            buyBtn.addEventListener("click", () => {
                buy().then(() => {
                    let num = localStorage.getItem("cartN");
                    localStorage.removeItem("cartN");
                    localStorage.setItem("cartN", "" + 0);
                    location.reload();
                });
            });
            btnSpace === null || btnSpace === void 0 ? void 0 : btnSpace.appendChild(buyBtn);
        }
    });
}
function buy() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=buy&ID=" + localStorage.getItem("userID"));
        const JsonObj = yield res.json();
    });
}
function loadCart() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=getCart&ID=" + localStorage.getItem("userID"));
        const JsonObj = yield res.json();
        return JsonObj.data;
    });
}
function removeFromCart(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=remove&ID=" + localStorage.getItem("userID") + "&item=" + id);
        const JsonObj = yield res.json();
        return JsonObj.data;
    });
}
