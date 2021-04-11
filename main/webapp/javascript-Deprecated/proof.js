let itemsHere = document.getElementById("items-here");
let loader = document.getElementById("loader");

async function click() {
    const reducer = (accumulator, item) => accumulator + `<div class="card card-catalogue">
                <button class="add-to-cart-btn">
                    <i class="fas fa-plus-circle"></i>
                </button>
                <img src="https://via.placeholder.com/250x250" alt="" />
                <div class="item-description">
                    <span>${item.name}</span><span>${item.price}$</span>
                </div>
            </div>`

    const response = await fetch(document.location.href+"Servlet");
    console.log(response);
    const geison = await response.json();
    console.log(geison);


    const result = geison.data.reduce(reducer,"");

    console.log(result)
    return result;
}

window.addEventListener("DOMContentLoaded", () => {
    click().then( result =>{
        loader.style.display="none";
        itemsHere.innerHTML= result;});

});





