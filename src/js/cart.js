import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import updateCartCount from "./cartCount.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  // If the cart is empty, show a message and stop
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = `No Items in Cart`;
    return;
  }

  // Otherwise, render the items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const imageSrc = item.Images?.PrimaryMedium || item.Image;
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imageSrc}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function displayCartTotal(cartItems) {
  if (cartItems && cartItems.length > 0) {
    const cartFooter = document.querySelector(".cart-footer");
    const cartTotal = document.querySelector(".cart-total");

    cartFooter.classList.remove("hide");

    let total = 0;

    cartItems.forEach((item) => {
      total += item.FinalPrice;
    });

    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
  }
}

displayCartTotal();

renderCartContents();
