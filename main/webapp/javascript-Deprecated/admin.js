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
let productSpace = document.getElementById("productTable");
let itemN = document.getElementById("itemN");
let productLoader = document.getElementById("productLoader");
let userSpace = document.getElementById("userTable");
let userN = document.getElementById("usersN");
let userLoader = document.getElementById("userLoader");
userSpace === null || userSpace === void 0 ? void 0 : userSpace.addEventListener("click", removeUser);
productSpace.addEventListener("click", productBehaviour);
window.addEventListener("DOMContentLoaded", () => {
    loadProducts().then(result => {
        if (productLoader && productSpace) {
            productLoader.style.display = "none";
            productSpace.innerHTML = result;
        }
    });
    loadUsers().then(result => {
        if (userLoader && userSpace) {
            userLoader.style.display = "none";
            userSpace.innerHTML = result;
        }
    });
});
function loadProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "AdminServlet" + "?ACTION=allProducts");
        const JsonObj = yield res.json();
        console.log(JsonObj.data);
        if (itemN) {
            itemN.innerText = JsonObj.data.length + " products";
        }
        let resultString = "";
        JsonObj.data.forEach(function (product) {
            resultString = resultString +
                `<tr>
				<td>${product.id}</td>
			<td>${product.name}</td>
		<td>x${product.quantity}</td>
		<td>$${product.price}</td>
		<td>
		<div class="review-button">
		<button class="review-button add-delete-button">
		<i class="fas fa-edit"></i>
			</button>
			</div>
			</td>
			</tr>`;
        });
        return resultString;
    });
}
function loadUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "AdminServlet" + "?ACTION=allUsers");
        const JsonObj = yield res.json();
        if (userN) {
            userN.innerText = JsonObj.data.length + " users";
        }
        let resultString = `<table class="order-table">
		<thead>
			<tr>
				<th>ID</th>
		<th>Name</th>
		<th>Surname</th>
		<th>Email</th>
		<th>Delete</th>
		</tr>
		</thead>
		<tbody>`;
        JsonObj.data.forEach(function (user) {
            resultString = resultString +
                `<tr>
				<td>${user.id}</td>
			<td>${user.name}</td>
		<td>${user.surname}</td>
		<td>${user.email}</td>
		<td>
		<div class="review-button">
		<button class="add-delete-button">
		<i class="fas fa-user-minus"></i>
			</button>
			</div>
			</td>
			</tr>`;
        });
        resultString = resultString + `</tbody></table>`;
        return resultString;
    });
}
function productBehaviour(e) {
    var _a, _b, _c;
    const button = e.target;
    if (button.classList.contains("fa-edit")) {
        button.closest("tr").cells[1].innerHTML = `<input type='text' name="newName" value=${(_a = button.closest("tr")) === null || _a === void 0 ? void 0 : _a.cells[1].innerText}>`;
        button.closest("tr").cells[2].innerHTML = `<input type='number' name="newQuantity" value=${(_b = button.closest("tr")) === null || _b === void 0 ? void 0 : _b.cells[2].innerText}>`;
        button.closest("tr").cells[3].innerHTML = `<input type='number' name="newPrice" value=${(_c = button.closest("tr")) === null || _c === void 0 ? void 0 : _c.cells[3].innerText}>`;
        button.closest("tr").cells[4].innerHTML = `<div class="review-button">
		<button class="review-button add-delete-button">
		<i class="fas fa-check"></i></button><button class="review-button add-delete-button">
		<i class="fas fa-times"></i></button></div>`;
        return;
    }
    if (button.classList.contains("fa-plus")) {
        button.closest("tr").cells[1].innerHTML = "<input type='text' name='newName'>";
        button.closest("tr").cells[2].innerHTML = "<input type='text' name='newQuantity'>";
        button.closest("tr").cells[3].innerHTML = "<input type='text' name='newPrice'>";
        button.closest("tr").cells[4].innerHTML = `<div class="review-button">
		<button class="review-button add-delete-button">
		<i class="fas fa-check"></i></button><button class="review-button add-delete-button">
		<i class="fas fa-times"></i></button></div>`;
        return;
    }
    if (button.classList.contains("fa-check")) {
        if (button.closest("tr").cells[0].innerHTML === "") {
            console.log("nuovo");
            return;
        }
        button.closest("tr").cells[0].innerHTML;
        console.log("update");
    }
    if (button.classList.contains("fa-times")) {
    }
}
function removeUser(e) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const button = e.target;
        if (button.classList.contains("fa-user-minus")) {
            let userId = (_a = button.closest("tr")) === null || _a === void 0 ? void 0 : _a.children[0].textContent;
            const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "AdminServlet" + "?ACTION=deleteUser&userID=" + userId);
            const JsonObj = yield res.json();
            if (JsonObj.data) {
                (_b = button.closest("tr")) === null || _b === void 0 ? void 0 : _b.remove();
            }
            else {
                alert(JsonObj.msg);
            }
        }
    });
}
