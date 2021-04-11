import {customerArrayResponse, ArrayProductResponse, booleanResponse} from "../models/responses";
import {Product} from "../models/product";


let productSpace: HTMLTableSectionElement = <HTMLTableSectionElement>document.getElementById("productTable");
let itemN = document.getElementById("itemN");
let productLoader = document.getElementById("productLoader");

let userSpace = document.getElementById("userTable");
let userN = document.getElementById("usersN");
let userLoader = document.getElementById("userLoader");

let productsOnTable: Array<Product>;

userSpace?.addEventListener("click", removeUser);

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
	})

	let addButton = document.getElementById("productAdd");
	addButton?.addEventListener("click", () => {
		let row: HTMLTableRowElement | null = document.createElement("tr");
		let lastRow = document.getElementById("lastRow");

		row.insertCell(0);
		row.insertCell(1);
		row.insertCell(2);
		row.insertCell(3);
		row.insertCell(4);

		let newName: HTMLInputElement = document.createElement("input");
		let newPrice: HTMLInputElement = document.createElement("input");
		let newQuantity: HTMLInputElement = document.createElement("input");

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
			addOrUpdate(-1, newName.value, newQuantity.value, newPrice.value).then(
				result => {
					if (row) {
						row.cells[0].innerText = "" + result;
						row.cells[1].innerText = newName.value;
						row.cells[2].innerText = "x" + newQuantity.value;
						row.cells[3].innerText = newPrice.value + "$";

						row.cells[4].innerText = "";
					}
				}
			)
		});

		button.appendChild(i);
		div.appendChild(button);
		row.cells[4].innerText = "";
		row.cells[4].appendChild(div);

		productSpace.insertBefore(row, lastRow);
	})
});

async function addOrUpdate(id: number, name: string, quantity: string, price: string) {
	if (id > 0) {
		const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=update&ID=" + id + "&NAME=" + name + "&QUANTITY=" + quantity + "&PRICE=" + price);
		const JsonObj: booleanResponse = await res.json();
	}

	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=create&NAME=" + name + "&QUANTITY=" + quantity + "&PRICE=" + price);
	const JsonObj: booleanResponse = await res.json();
	return JsonObj.data;
}

async function deleteOrRemove(id: number) {
	if (id > 0) {
		const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "Servlet" + "?ACTION=delete&ID=" + id);
		const JsonObj: booleanResponse = await res.json();
	}
}

async function loadProducts() {
	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "AdminServlet" + "?ACTION=allProducts");
	const JsonObj: ArrayProductResponse = await res.json();
	productsOnTable = JsonObj.data;
	if (itemN) {
		itemN.innerText = productsOnTable.length + " products";
	}

	productsOnTable.forEach(function (product) {
		let row: HTMLTableRowElement = productSpace.insertRow(0);
		let idCell: HTMLTableCellElement = row.insertCell(0);
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
			let newName: HTMLInputElement = document.createElement("input");
			newName.value = product.name;

			let newPrice: HTMLInputElement = document.createElement("input");
			newPrice.value = "" + product.price;

			let newQuantity: HTMLInputElement = document.createElement("input");
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
	})
}

async function loadUsers() {
	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "AdminServlet" + "?ACTION=allUsers");
	const JsonObj: customerArrayResponse = await res.json();
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
	resultString = resultString + `</tbody></table>`

	return resultString;
}

async function removeUser(e: Event) {
	const button: HTMLElement = e.target as HTMLElement;

	if (button.classList.contains("fa-user-minus")) {

		let userId = button.closest("tr")?.children[0].textContent;
		const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "AdminServlet" + "?ACTION=deleteUser&userID=" + userId);
		const JsonObj: booleanResponse = await res.json();
		if (JsonObj.data) {
			button.closest("tr")?.remove();
		} else {
			alert(JsonObj.msg);
		}
	}
}