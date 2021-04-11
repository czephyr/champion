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
let itemsHere = document.getElementById("items-here");
let loader = document.getElementById("loader");
let filterButton = document.getElementById("filterButton");
let itemN = document.getElementById("itemN");
if (itemsHere) {
    itemsHere.addEventListener("click", setClickBehaviour);
}
function setClickBehaviour(e) {
    if (e.target) {
        // @ts-ignore
        if (e.target.parentElement.id === "add-to-cart-btn") {
            addToCart2(parseInt(e.target.closest(".card").id)).then(r => {
                let num = localStorage.getItem("cartN");
                localStorage.removeItem("cartN");
                localStorage.setItem("cartN", "" + (parseInt(num) + 1));
                location.reload();
                return;
            });
        }
        else if (e.target.closest(".card").id) {
            // @ts-ignore
            window.location.href = '/demo_war_exploded/productpage.html?productID=' + e.target.closest(".card").id;
        }
        else if (e.target.id === "items-here") {
            return;
        }
    }
}
function filterCatalogue() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (loader) {
            loader.style.display = "inline-block";
        }
        let searchBar = document.getElementById("searchBar");
        let orderDropdown = document.getElementById("order");
        let name = (_a = searchBar.value) !== null && _a !== void 0 ? _a : "";
        let order = (_b = orderDropdown.value) !== null && _b !== void 0 ? _b : "";
        const reducer = (accumulator, item) => accumulator + `<div class="card card-catalogue" id="${item.id}">
                <button class="add-to-cart-btn" id="add-to-cart-btn">
                    <i class="fas fa-plus-circle"></i>
                </button>
                <img src="https://via.placeholder.com/250x250" alt="" />
                <div class="item-description">
                    <span>${item.name}</span><span>${item.price}$</span>
                </div>
            </div>`;
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=filter&NAME=" + name + "&ORDER=" + order);
        const JsonObj = yield res.json();
        const result = JsonObj.data.reduce(reducer, "");
        if (itemN) {
            itemN.innerText = JsonObj.data.length + " products";
        }
        if (itemsHere) {
            itemsHere.innerHTML = result;
        }
    });
}
filterButton.addEventListener("click", filterCatalogue);
function loadFullCatalogue() {
    return __awaiter(this, void 0, void 0, function* () {
        const reducer = (accumulator, item) => accumulator + `
							<div class="card card-catalogue" id="${item.id}">
                <button class="add-to-cart-btn" id="add-to-cart-btn">
                    <i class="fas fa-plus-circle"></i>
                </button>
                <img src="http://localhost:8080/demo_war_exploded/sources/images/${item.img250}.png" alt="" />
                <div class="item-description">
                    <span>${item.name}</span><span>${item.price}$</span>
                </div>
            </div>`;
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=all");
        const JsonObj = yield res.json();
        if (itemN) {
            itemN.innerText = JsonObj.data.length + " products";
        }
        return JsonObj.data.reduce(reducer, "");
    });
}
window.addEventListener("DOMContentLoaded", () => {
    loadFullCatalogue().then(result => {
        if (loader && itemsHere) {
            loader.style.display = "none";
            itemsHere.innerHTML = result;
        }
    });
});
function addToCart2(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkRes = yield fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=check&ID=" + localStorage.getItem("userID"));
        const checkJsonObj = yield checkRes.json();
        if (checkJsonObj.data && checkJsonObj.data.includes(id)) {
            const ures = yield fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=update&ID=" + localStorage.getItem("userID") + "&item=" + id);
            const uJsonObj = yield ures.json();
            return;
        }
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=add&ID=" + localStorage.getItem("userID") + "&item=" + id);
        const JsonObj = yield res.json();
    });
}
