var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let itemsHere = document.getElementById("product-zone");
let loader = document.getElementById("loader");
let reviews = document.getElementById("reviews");
let loader2 = document.getElementById("loader2");
const currentProductID = (new URLSearchParams(window.location.search)).get('productID');
function loadProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const reducer = (accumulator, item) => accumulator +
            `<img src="https://via.placeholder.com/550x550" alt=""/>
	<div class="column">
		<h1 class="product-name">${item.name}</h1>
		<h2 class="product-info1">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, qui.
		</h2>
		<div class="product-descr">
			${item.text}
		</div>
	</div>`;
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=byID&PRODUCTID=" + currentProductID);
        const JsonObj = yield res.json();
        return JsonObj.data[0];
    });
}
function loadReviews() {
    return __awaiter(this, void 0, void 0, function* () {
        const reducer2 = (accumulator, review) => accumulator +
            `<div class="card card-section">
																		<div class="column">
																			<div class="category-title item-description">${review.customerName}</div>
																			<div class="item-description">${review.text}</div>
																		</div>
																	</div>`;
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "ReviewServlet" + "?PRODUCTID=" + currentProductID);
        const JsonObj = yield res.json();
        return JsonObj.data.reduce(reducer2, "");
    });
}
function addToCart(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkRes = yield fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=check&ID=" + localStorage.getItem("userID"));
        const checkJsonObj = yield checkRes.json();
        if (checkJsonObj.data && checkJsonObj.data.indexOf(id)) {
            const ures = yield fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=update&ID=" + localStorage.getItem("userID") + "&item=" + id);
            const uJsonObj = yield ures.json();
            return;
        }
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=add&ID=" + localStorage.getItem("userID") + "&item=" + id);
        const JsonObj = yield res.json();
    });
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
export {};
