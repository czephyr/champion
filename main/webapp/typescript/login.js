var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let loginString = `<div class="close-login-button">
<button class="close-login" onclick="logForm()">
<i class="fas fa-times"></i>
	</button>
	</div>
	<div>
	<h2>Sign up</h2>

<form name="signup">
	<div class="inputs">
		<label for="name">Name</label>
		<input type="text" name="name" id="name" required/>
		<label for="surname">Surname</label>
		<input type="text" name="surname" id="surname" required/>
		<label for="email">Email</label>
		<input type="email" name="email" id="email" required pattern="[\\.\\w-]+@[\\w]+\\.[\\w]+"/>
		<label for="password">Password</label>
		<input type="password" name="password" id="password" required/>
		<label for="address">Address</label>
		<input type="text" name="address" id="address" required/>
	</div>
	<a class="btn" onclick="SignUp()">View</a>
</form>
	</div>
	<div>
	<h2>or Login</h2>
<form name="login">
	<div class="inputs">
		<label for="logemail">Email</label>
		<input type="email" id="logemail" name="logemail" required pattern="[\\.\\w-]+@[\\w]+\\.[\\w]+"/>
		<label for="logpassword">Password</label>
		<input type="password" id="logpassword" name="logpassword" required/>
	</div>
	<a class="btn" onclick="Login()">View</a>
</form>
</div>`;
window.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("login")) {
        // @ts-ignore
        document.getElementById("login").innerHTML = loginString;
    }
});
function logForm() {
    let login = document.getElementById("login");
    if (login) {
        login.classList.toggle("loginOpen");
    }
}
function SignUp() {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        let form = (document.forms).signup;
        const rsp = yield fetch("http://localhost:8080/demo_war_exploded/" + "CustomerServlet", {
            method: "POST",
            body: new URLSearchParams([["ACTION", "check"], ...new FormData(form)]),
        });
        const JsonObj = yield rsp.json();
        if (JsonObj.data) {
            const insertRsp = yield fetch("http://localhost:8080/demo_war_exploded/" + "CustomerServlet", {
                method: "POST",
                body: new URLSearchParams([["ACTION", "signup"], ...new FormData(form)]),
            });
            const JsonObj = yield insertRsp.json();
            const cartRsp = yield fetch("http://localhost:8080/demo_war_exploded/" + "CustomerServlet", {
                method: "POST",
                body: new URLSearchParams([["ACTION", "cartN"], ["id", "" + JsonObj.data.id]]),
            });
            const jsonCart = yield cartRsp.json();
            localStorage.setItem("userID", "" + JsonObj.data.id);
            localStorage.setItem("cartN", "" + jsonCart.data);
            localStorage.setItem("admin", "" + JsonObj.data.isAdmin);
            document.location.reload(true);
        }
    });
}
function Login() {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        let form = (document.forms).login;
        const rsp = yield fetch("http://localhost:8080/demo_war_exploded/" + "CustomerServlet", {
            method: "POST",
            body: new URLSearchParams([["ACTION", "login"], ...new FormData(form)]),
        });
        const JsonObj = yield rsp.json();
        if (JsonObj.data != null) {
            const cartRsp = yield fetch("http://localhost:8080/demo_war_exploded/" + "CustomerServlet", {
                method: "POST",
                body: new URLSearchParams([["ACTION", "cartN"], ["id", "" + JsonObj.data.id]]),
            });
            const jsonCart = yield cartRsp.json();
            localStorage.setItem("userID", "" + JsonObj.data.id);
            localStorage.setItem("cartN", "" + jsonCart.data);
            localStorage.setItem("admin", "" + JsonObj.data.isAdmin);
            document.location.reload(true);
        }
    });
}
export {};
