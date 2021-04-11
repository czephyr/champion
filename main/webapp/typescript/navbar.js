let logged = `<li><a href="#" class="nav-link" onclick="logForm()">Log In</a></li>`;
let cartN = "";
let admin = "";
let nav;
let content;
if (localStorage.getItem("userID") != null) {
    logged = `<li><a href="orderpage.html" class="nav-link">Orders</a></li>`;
    cartN = `<li><a href="#" class="nav-link" onclick="cartPopup()">Cart(` + localStorage.getItem("cartN") + `)</a></li>`;
    if ((localStorage.getItem("admin") === "true")) {
        admin = `<li><a href="adminpage.html" class="nav-link">Admin</a></li>`;
    }
    else if (localStorage.getItem("userID")) {
        admin = `<li><a href="#" id="logOutBtn" class="nav-link">Log Out</a></li>`;
    }
}
let navString = `<button class="close-button" onclick="navOpen()">
<i class="fas fa-bars"></i>
	</button>` +
    ((window.location.href.indexOf("catalogue.html") > -1) ? `<button class="search-button" onclick="searchClick()">
<i class="fas fa-search"></i>
</button>` : "") + `<ul class="navbar" id="navbar">
<li><a href="index.html" class="nav-link">Home</a></li>
<li><a href="catalogue.html" class="nav-link">Catalogue</a></li>` + logged + cartN + admin + `</ul>`;
window.addEventListener("DOMContentLoaded", () => {
    document.getElementsByTagName("nav")[0].innerHTML = navString;
    if (document.getElementById("logOutBtn")) {
        document.getElementById("logOutBtn").addEventListener("click", () => {
            localStorage.removeItem("userID");
            location.reload();
        });
    }
    nav = document.getElementById("navbar");
    content = document.getElementById("content");
});
function navOpen() {
    if (nav && content) {
        nav.classList.toggle("navOpen");
        content.classList.toggle("opaque");
        content.onclick = contentClick;
    }
}
function contentClick() {
    if (nav && content) {
        nav.classList.remove("navOpen");
        content.classList.remove("opaque");
        content.onclick = null;
    }
}
