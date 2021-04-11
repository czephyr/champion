let productSpace = document.getElementById("productTable");
let itemN = document.getElementById("itemN");
let productLoader = document.getElementById("productLoader");

let userSpace = document.getElementById("userTable");
let userN = document.getElementById("usersN");
let userLoader = document.getElementById("userLoader");

interface User {
	id: number;
	email: string;
	name: string;
	surname: string;
}

interface Product {
	id: number;
	price: number;
	text: string;
	name: string;
	category: string;
	quantity: number;
}

interface productsJSONResponse {
	data: Array<Product>;
	status: number;
}

interface userJSONResponse {
	data: Array<User>;
	status: number;
}

interface booleanJSONResponse {
	data: boolean;
	status: number;
	msg: string;
}

userSpace?.addEventListener("click", removeUser);
productSpace.addEventListener("click",productBehaviour);

window.addEventListener("DOMContentLoaded", () => {
	loadProducts().then(result => {
		if (productLoader && productSpace) {
			productLoader.style.display = "none";
			productSpace.innerHTML = result;
		}
	})

	loadUsers().then(result => {
		if (userLoader && userSpace) {
			userLoader.style.display = "none";
			userSpace.innerHTML = result;
		}
	})
})

async function loadProducts() {
	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "AdminServlet" + "?ACTION=allProducts");
	const JsonObj: productsJSONResponse = await res.json();
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
			</tr>`
	})
	return resultString;
}

async function loadUsers() {
	const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "AdminServlet" + "?ACTION=allUsers");
	const JsonObj: userJSONResponse = await res.json();
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

function productBehaviour(e : Event){
	const button : HTMLElement = e.target as HTMLElement;

	if(button.classList.contains("fa-edit")){
		button.closest("tr").cells[1].innerHTML = `<input type='text' name="newName" value=${button.closest("tr")?.cells[1].innerText}>`;
		button.closest("tr").cells[2].innerHTML = `<input type='number' name="newQuantity" value=${button.closest("tr")?.cells[2].innerText}>`;
		button.closest("tr").cells[3].innerHTML = `<input type='number' name="newPrice" value=${button.closest("tr")?.cells[3].innerText}>`;
		button.closest("tr").cells[4].innerHTML = `<div class="review-button">
		<button class="review-button add-delete-button">
		<i class="fas fa-check"></i></button><button class="review-button add-delete-button">
		<i class="fas fa-times"></i></button></div>`;
		return;
	}

	if(button.classList.contains("fa-plus")){
		button.closest("tr").cells[1].innerHTML = "<input type='text' name='newName'>";
		button.closest("tr").cells[2].innerHTML = "<input type='text' name='newQuantity'>";
		button.closest("tr").cells[3].innerHTML = "<input type='text' name='newPrice'>";
		button.closest("tr").cells[4].innerHTML = `<div class="review-button">
		<button class="review-button add-delete-button">
		<i class="fas fa-check"></i></button><button class="review-button add-delete-button">
		<i class="fas fa-times"></i></button></div>`;
		return;
	}

	if(button.classList.contains("fa-check")){
		if(button.closest("tr").cells[0].innerHTML === ""){
			console.log("nuovo");
			return;
		}

		button.closest("tr").cells[0].innerHTML;
		console.log("update");
	}

	if(button.classList.contains("fa-times")){

	}
}










async function removeUser(e : Event){
	const button : HTMLElement = e.target as HTMLElement;

	if(button.classList.contains("fa-user-minus")){

		let userId = button.closest("tr")?.children[0].textContent;
		const res: Response = await fetch("http://localhost:8080/demo_war_exploded/" + "AdminServlet" + "?ACTION=deleteUser&userID="+userId);
		const JsonObj: booleanJSONResponse = await res.json();
		if(JsonObj.data){
			button.closest("tr")?.remove();
		}
		else{
			alert(JsonObj.msg);
		}
	}
}



