//Cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let cartClose = document.querySelector('#close-cart')

cartIcon.onclick = () => {
    cart.classList.remove("cart");
    cart.classList.add("cart-active");
};
cartClose.onclick = () => {
    cart.classList.remove("cart-active");
    cart.classList.add("cart");
}

//cart working

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
            ready();
        }

//Making function

function ready() {
    //Remove item from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);

        }
        //Quantity changes
        var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged);
    }

    //Add cart
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }


    //buy button
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}
//buy button
function buyButtonClicked() {
    alert('Your Order is placed')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}
//Add cart
function addCartClicked (event) {
    var button = event.target
    var produk = button.parentElement
    var barang = produk.getElementsByClassName('product-title')[0].innerText
    var harga = produk.getElementsByClassName('price')[0].innerText
    var foto = produk.getElementsByClassName('product-img')[0].src
    addProdukToCart(barang, harga, foto);

}

function addProdukToCart(barang, harga, foto) {
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')

    var cartItem = document.getElementsByClassName('cart-content')[0]
    var cartItemName = cartItem.getElementsByClassName('cart-product-title')
    for (var i=0; i < cartItemName.length; i++) {
        if (cartItemName[i].innerText == barang) {
            alert('Anda telah menambahkan kedalam keranjang')
            return;
        }
    }
    var cartBoxContent = `<img src="${foto}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${barang}</div>
                                <div class="cart-product-price">${harga}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!-- Remove cart -->
                            <i class='bx bxs-trash cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent
    cartItem.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}


//Quantity change
function quantityChanged (event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal();
}
//Remove item from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//update total
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-product-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("Rp", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
        //Desimal
        total = Math.round(total * 100)/100

        document.getElementsByClassName('total-price')[0].innerText = 'Rp' + total;
    
}