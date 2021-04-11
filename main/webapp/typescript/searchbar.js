"use strict";
let forms = document.getElementById("searchForms");
function searchClick() {
    if (forms) {
        forms.classList.toggle("filterOpen");
        window.scrollTo(0, 0);
    }
}
