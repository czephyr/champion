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
let productsOnTable;
userSpace === null || userSpace === void 0 ? void 0 : userSpace.addEventListener("click", removeUser);
window.addEventListener("DOMContentLoaded", () => {
    loadProducts().then(() => {
        if (productLoader && productSpace) {
            productLoader.style.display = "none";
        }
    });
    loadUsers().then(result => {
        if (userLoader && userSpace) {
            userLoader.style.display = "none";
            userSpace.innerHTML = result;
        }
    });
    let addButton = document.getElementById("productAdd");
    addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", () => {
        let row = document.createElement("tr");
        let lastRow = document.getElementById("lastRow");
        row.insertCell(0);
        row.insertCell(1);
        row.insertCell(2);
        row.insertCell(3);
        row.insertCell(4);
        let newName = document.createElement("input");
        let newPrice = document.createElement("input");
        let newQuantity = document.createElement("input");
        row.cells[1].appendChild(newName);
        row.cells[2].appendChild(newQuantity);
        row.cells[3].appendChild(newPrice);
        let div = document.createElement("div");
        div.setAttribute("class", "review-button");
        let button = document.createElement("button");
        button.setAttribute("class", "review-button add-delete-button");
        let i = document.createElement("i");
        i.setAttribute("class", "fas fa-check");
        i.addEventListener("click", () => {
            addOrUpdate(-1, newName.value, newQuantity.value, newPrice.value).then(result => {
                if (row) {
                    row.cells[0].innerText = "" + result;
                    row.cells[1].innerText = newName.value;
                    row.cells[2].innerText = "x" + newQuantity.value;
                    row.cells[3].innerText = newPrice.value + "$";
                    row.cells[4].innerText = "";
                }
            });
        });
        button.appendChild(i);
        div.appendChild(button);
        row.cells[4].innerText = "";
        row.cells[4].appendChild(div);
        productSpace.insertBefore(row, lastRow);
    });
});
function addOrUpdate(id, name, quantity, price) {
    return __awaiter(this, void 0, void 0, function* () {
        if (id > 0) {
            const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=update&ID=" + id + "&NAME=" + name + "&QUANTITY=" + quantity + "&PRICE=" + price);
            const JsonObj = yield res.json();
        }
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=create&NAME=" + name + "&QUANTITY=" + quantity + "&PRICE=" + price);
        const JsonObj = yield res.json();
        return JsonObj.data;
    });
}
function deleteOrRemove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (id > 0) {
            const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=delete&ID=" + id);
            const JsonObj = yield res.json();
        }
    });
}
function loadProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("http://localhost:8080/demo_war_exploded/" + "AdminServlet" + "?ACTION=allProducts");
        const JsonObj = yield res.json();
        productsOnTable = JsonObj.data;
        if (itemN) {
            itemN.innerText = productsOnTable.length + " products";
        }
        productsOnTable.forEach(function (product) {
            let row = productSpace.insertRow(0);
            let idCell = row.insertCell(0);
            idCell.innerText = "" + product.id;
            let nameCell = row.insertCell(1);
            nameCell.innerText = product.name;
            nameCell.addEventListener("click", () => {
                window.location.href = '/demo_war_exploded/productpage.html?productID=' + product.id;
            });
            row.insertCell(2).innerText = "x" + product.quantity;
            row.insertCell(3).innerText = product.price + "$";
            let div = document.createElement("div");
            div.setAttribute("class", "review-button");
            let button = document.createElement("button");
            button.setAttribute("class", "review-button add-delete-button");
            let i = document.createElement("i");
            i.setAttribute("class", "fas fa-edit");
            i.addEventListener("click", () => {
                let newName = document.createElement("input");
                newName.value = product.name;
                let newPrice = document.createElement("input");
                newPrice.value = "" + product.price;
                let newQuantity = document.createElement("input");
                newQuantity.value = "" + product.quantity;
                row.cells[1].textContent = "";
                row.cells[1].appendChild(newName);
                row.cells[2].textContent = "";
                row.cells[2].appendChild(newQuantity);
                row.cells[3].textContent = "";
                row.cells[3].appendChild(newPrice);
                let div1 = document.createElement("div");
                div1.setAttribute("class", "review-button");
                let button1 = document.createElement("button");
                button1.setAttribute("class", "review-button add-delete-button");
                let button2 = document.createElement("button");
                button2.setAttribute("class", "review-button add-delete-button");
                let i2 = document.createElement("i");
                i2.setAttribute("class", "fas fa-check");
                i2.addEventListener("click", () => {
                    addOrUpdate(product.id, newName.value, newQuantity.value, newPrice.value);
                    row.cells[0].innerText = "" + product.id;
                    row.cells[1].innerText = newName.value;
                    row.cells[2].innerText = "x" + newQuantity.value;
                    row.cells[3].innerText = newPrice.value + "$";
                    button.appendChild(i);
                    div.appendChild(button);
                    row.cells[4].innerText = "";
                    row.cells[4].appendChild(div);
                });
                let i3 = document.createElement("i");
                i3.setAttribute("class", "fas fa-times");
                i3.addEventListener("click", () => {
                    deleteOrRemove(product.id);
                    row.remove();
                });
                button1.appendChild(i2);
                button2.appendChild(i3);
                div1.appendChild(button1);
                div1.appendChild(button2);
                row.cells[4].textContent = "";
                row.cells[4].appendChild(div1);
            });
            button.appendChild(i);
            div.appendChild(button);
            row.insertCell(4).appendChild(div);
        });
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
