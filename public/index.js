let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
};

const formOpenBtn = document.querySelector("#form-open"),
 home = document.querySelector(".home"),

// log in form //
formContainer = document.querySelector(".form_container"),
formCloseBtn = document.querySelector(".form_close"),
signupBtn = document.querySelector("#signup"),
loginBtn = document.querySelector("#login"),
pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click",() => home.classList.add("show"))
formCloseBtn.addEventListener("click",() => home.classList.remove("show"))

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
  let getPwInput = icon.parentElement.querySelector("input");
  if(getPwInput.type === "password"){
    getPwInput.type = "text";
    icon.classList.replace("uil-eye-slash", "uil-eye");
  }else{
    getPwInput.type = "password";
    icon.classList.replace("uil-eye", "uil-eye-slash");
  }
});
});


signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});
 
// cart-form //
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closecart = document.querySelector("#close-cart");
//opencart//
cartIcon.onclick = () => {
  cart.classList.add("active");
};
//close cart//
closecart.onclick = () => {
  cart.classList.remove("active");
};

//cart working 
if (document.readyState == "loading"){
  document.addEventListener("DOMContentLoaded", ready);
}else{
  ready();
}

//making function
function ready(){
  //remove items from cart
  var removeCartButtons = document.getElementsByClassName('cart-remove');
  (removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++){
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItems);
  }
  //quantity changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  
  //add to  cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++){
  var button = addCart[i];
  button.addEventListener("click", addCartClicked);
  }
   loadCartItems();
   saveCartItems();
 }

 //remove  items from cart
 function removeCartItems(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
  updateCartCount();
  saveCartItems();
 }
 //quantity change

 function quantityChanged(event){
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
  updateCartCount();
  saveCartItems();
 }
 // add to cart
 function addCartClicked(event){
  var button = event.target;
  var shopProducts = button.parentElement.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
  updateCartCount();
  saveCartItems();
 }
function addProductToCart (title, price, productImg){
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++){
    if (cartItemsNames[i].innerText == title){
    alert("You have already add this item to cart");
    return;
  }

}
 var cartBoxContent = `
            <img src ="${productImg}" alt="" class = "cart-img">
            <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
          </div>
          <!--remove-cart-->
          <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItems);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
    updateCartCount();
    saveCartItems();
}


 //update total
 function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++){
  var cartBox = cartBoxes[i];
  var priceElement = cartBox.getElementsByClassName("cart-price")[0];
  var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
  var price = parseFloat(priceElement.innerText.replace("₱", "").replace(",","")) || 0;
  var quantity = quantityElement.value;
  total = total + price * quantity;
  }
  //IF money some cent value//
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "₱ " + total.toLocaleString("en-ph");
  //save total to localstorage

  localStorage.setItem("cartTotal", total);
 }
 //para hindi pumunta sa home page pag pinindot ang add to cart icon
 document.addEventListener("DOMContentLoaded", function () {
  var addToCartIcons = document.querySelectorAll(".add-cart");
  
  addToCartIcons.forEach(function (icon) {
    icon.addEventListener("click", function (event) {
      // para hindi tumaas pag pinindot ang item
      event.preventDefault();
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  
  var CartIcons = document.querySelectorAll("#cart-icon");
  CartIcons.forEach(function (icon) {
    icon.addEventListener("click", function (event) {
      // para hindi tumaas pag pinindot ang item
      event.preventDefault();
    });
  });
});
 
// cart-count pagdagdag ng bilang at pag bawas 

function addToCart(button) {
  var product = button.parentElement.parentElement;
  var title = product.querySelector(".product-title").innerText;

  // Kunin ang existing cart box para sa item
  var existingCartBox = findCartItem(title);

  if (existingCartBox) {
    // Kung mayroon nang existing na item sa cart, i-increment ang quantity
    var quantityInput = existingCartBox.querySelector(".cart-quantity");
    var currentQuantity = parseInt(quantityInput.value) || 0;
    quantityInput.value = currentQuantity + 1;
  } else {
    // Kung wala pang existing na item, lumikha ng bagong cart box
    createNewCartItem(title);
  }

  // I-update ang cart count
  updateCartCount();
}

function updateCartCount() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var cartCount = 0;

  // Kunin ang dami ng bawat item at i-add sa kabuuang dami
  for (var i = 0; i < cartBoxes.length; i++) {
    var quantityInput = cartBoxes[i].querySelector(".cart-quantity");
    cartCount += parseInt(quantityInput.value) || 0;
  }

  var cartCountSpan = document.getElementById("cart-count");
  cartCountSpan.innerText = cartCount;

  updatetotal();
}

// user acc function

function menuToggle() {
  var userMenu = document.querySelector('.user-name');
  userMenu.classList.toggle('active');
}

function closeMenu() {
  var userMenu = document.querySelector('.user-name');
  userMenu.style.display = 'none';
  setTimeout(function() {
    userMenu.style.display = 'block';
    userMenu.classList.remove('active');
  }, 300);
}

//keep item in cart when page refresh with localstorage

function saveCartItems() {
  var cartContent = document.getElementsByClassName("cart-content")[0]; 
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var cartItems = [];

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var productImg = cartBox.getElementsByClassName("cart-img")[0].src;

    var item = {
      title: titleElement.innerText,
      price: priceElement.innerText,
      quantity: quantityElement.value,
      productImg: productImg,
    };

    cartItems.push(item);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

 //loads in cart

 function loadCartItems() {
  var cartItems = localStorage.getItem("cartItems");
  if (cartItems){
    cartItems = JSON.parse(cartItems);


    for(var i = 0; i < cartItems.length; i++){
      var item = cartItems[i];
      addProductToCart(item.title, item.price, item.productImg);

      var cartBoxes = document.getElementsByClassName("cart-box");
      var cartBox = cartBoxes[cartBoxes.length -1];
      var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
      quantityElement.value = item.quantity;
    }
  }
   var cartTotal = localStorage.getItem("cartTotal");
   if(cartTotal){
    document.getElementsByClassName("total-price")[0].innerText = "₱ " + cartTotal;
   }
 }

 //clear item after successful payment

 function clearCart(){
  var cartContent = document.getElementsByClassName("cart-content")[0];
  cartContent.innerHTML = "",
  updatetotal();
  localStorage.removeItem("cartItems");
 }









