var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let top3row = document.getElementById("top3");
let top3loader = document.getElementById("top3loader");
if (top3row) {
    top3row.addEventListener("click", thisFunction);
}
function thisFunction(e) {
    if (e.target) {
        // @ts-ignore
        if (e.target.parentElement.id === "add-to-cart-btn") {
            addToCart1(parseInt(e.target.closest(".card").id)).then(r => {
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
    }
}
function loadProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const reducer = (accumulator, item) => accumulator +
            `<div class="card" id="${item.id}">
											<button class="add-to-cart-btn" id="add-to-cart-btn">
                    		<i class="fas fa-plus-circle"></i>
                			</button>
											<img src="http://localhost:8080/demo_war_exploded/sources/images/${item.img250}.png"" alt=""/>
											<div class="item-description">
												<span>${item.name}</span><span>${item.price}$</span>
											</div>
										</div>`;
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=top3");
        const JsonObj = yield res.json();
        return JsonObj.data.reduce(reducer, "");
    });
}
window.addEventListener("DOMContentLoaded", () => {
    loadProducts().then(result => {
        if (top3loader && top3row) {
            top3loader.style.display = "none";
            top3row.innerHTML = result;
        }
    });
});
function addToCart1(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkRes = yield fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=check&ID=" + localStorage.getItem("userID"));
        const checkJsonObj = yield checkRes.json();
        // @ts-ignore
        if (checkJsonObj.data && checkJsonObj.data.includes(id)) {
            const ures = yield fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=update&ID=" + localStorage.getItem("userID") + "&item=" + id);
            const uJsonObj = yield ures.json();
            return;
        }
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "CartServlet" + "?ACTION=add&ID=" + localStorage.getItem("userID") + "&item=" + id);
        const JsonObj = yield res.json();
    });
}
export {};
