//Add to cart button and quantity buttons
var addToCartBtn = document.getElementById("add-to-cart");
var cartQuantityInput = document.getElementById("cart-quantity");
var cartQuantityIncreaseBtn = document.getElementById("cart-quantity-increase");
var cartQuantityDecreaseBtn = document.getElementById("cart-quantity-decrease");


/*-------------------------Increase and Decrease Buttons--------------------------------*/
cartQuantityIncreaseBtn.addEventListener("click", function () {
    cartQuantityInput.value = parseInt(cartQuantityInput.value) + 1;
});


cartQuantityDecreaseBtn.addEventListener("click", function () {
    cartQuantityInput.value = Math.max(parseInt(cartQuantityInput.value) - 1, 1);
});

/*--------------------------------ADD TO CART------------------------------------------ */
var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

addToCartBtn.addEventListener("click", function () {
    //CREATE PRODUCT OBJECTS in that page
    var product = {
        name: "Fall Limited Edition Sneakers",
        img: "./images/image-product-1-thumbnail.jpg",
        price: 125.00,
        quantity: parseInt(cartQuantityInput.value)
    };
    //Push it to localstorage
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems))

    //Badge update
    badge.innerText = cartItems.length;



    alert("Product Added to cart");
    showCart();
})

/*-------------------------Badge Display--------------------------- */
var badge = document.getElementById("count");
badge.innerText = cartItems.length;



/*----------------------------------PROFILE BASKET CART--------------------------- */
function showCart() {
    const existingCart = localStorage.getItem('cartItems');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    const cartElement = document.querySelector('#cart-items');
    cartElement.innerHTML = '';

    if (cart.length > 0) {
        const ul = document.createElement('ul');
        cart.forEach(product => {
            const li = document.createElement('li');
            const h4 = document.createElement('h4');
            const div = document.createElement('div')
            const p = document.createElement('p')
            const b = document.createElement('b')
            const img = document.createElement('img');
            const dlt = document.createElement('button');

            img.src = `${product.img}`;
            h4.textContent = `${product.name}`
            p.textContent = `$${product.price.toFixed(2)} x ${product.quantity}`

            totalAmount = product.price.toFixed(2) * product.quantity
            b.textContent = `$` + totalAmount + `.00`

            dlt.textContent = "X";
            dlt.id = "delete-btn";
            dlt.addEventListener("click", function () {
                cartItems.splice(`${product.index}`, 1);
                // Update the cart badge and local storage
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                badge.innerText = cartItems.length;
                // Update the cart UI to reflect the changes
                alert("Product Deleted to cart");
                showCart();
            })

            div.appendChild(h4);
            div.appendChild(p);
            p.appendChild(b);
            li.appendChild(img);
            li.appendChild(div);
            li.appendChild(dlt);
            ul.appendChild(li);
        });
        cartElement.appendChild(ul);

    } else {
        const p = document.createElement('p');
        p.textContent = 'Your card is empty';
        cartElement.appendChild(p);
    }

}
showCart();


/*-------------------------------MOBILE NAVBAR MENU----------------------------- */
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const mobileMenu = document.getElementById("mobile-menu");

openBtn.addEventListener("click", function () {
    mobileMenu.style.display = "flex"
})

closeBtn.addEventListener("click", function () {
    mobileMenu.style.display = "none"
})

/*--------------------------------------LIGHTBOX IMAGES------------------------------------ */
function showBigImage(img) {
    var BigImage = document.getElementById("big-image");
    var BigImageImg = document.getElementById("big-image-img");

    //Modal section
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modalImg")

    if (modal.style.display === "flex") {
        return modalImg.src = img.src;
    }
    else {
        BigImage.style.display = "block";
        BigImageImg.src = img.src;
    }
}

/*--------------------------------------OPEN MODAL------------------------------------ */
function openModal(img) {
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modalImg");
    var closeModalBtn = document.getElementById("modal-close-btn")

    modal.style.display = "flex";
    modalImg.src = img.src;

    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

/*---------------Navbar Profile Cart Toggle---------------*/
const profileCard = document.getElementById("profile-card");

function toogleCart() {
    if (profileCard.style.display === "none") {
        profileCard.style.display = "block";
    } else {
        profileCard.style.display = "none";
    }
}

