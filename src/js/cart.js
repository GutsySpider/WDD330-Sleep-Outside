import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";
import updateCartCount from "./cartCount.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

loadHeaderFooter();

let cartItems = getLocalStorage("so-cart") || [];

renderCartContents(cartItems);
setupCheckoutButton();

function renderCartContents(cartItems) {
  const list = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    list.innerHTML = `
      <li class="empty-cart">
        <h3>Your cart is empty</h3>
        <p>Looks like you haven’t added anything yet.</p>
        <a href="/index.html" class="shop-now-btn">Shop Now</a>
      </li>
    `;
    return;
  }

  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index)
  );

  list.innerHTML = htmlItems.join("");

  attachEventListeners();
}

function cartItemTemplate(item, index) {
  const imageSrc = item.Images?.PrimaryMedium || item.Image;
  const quantity = item.quantity || 1;
  const subtotal = item.FinalPrice * quantity;

  return `
    <li class="cart-card divider">
      <img src="${imageSrc}" alt="${item.Name}" class="cart-card__image" />

      <div class="cart-card__details">
        <h2 class="card__name">${item.Name}</h2>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>

        <div class="cart-card__qty">
          <label>Qty:</label>
          <input type="number" min="1" value="${quantity}" data-index="${index}" class="qty-input" />
        </div>

        <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
        <p class="cart-card__subtotal">Subtotal: $${subtotal.toFixed(2)}</p>

        <button class="remove-item" data-index="${index}">Remove</button>
      </div>
    </li>
  `;
}

function attachEventListeners() {
  document.querySelectorAll(".qty-input").forEach((input) => {
    input.addEventListener("change", updateQuantity);
  });

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });
}

function updateQuantity(e) {
  const index = e.target.dataset.index;
  const newQty = parseInt(e.target.value);

  if (isNaN(newQty) || newQty < 1) {
    e.target.value = cartItems[index].quantity || 1;
    return;
  }

  cartItems[index].quantity = newQty;
  setLocalStorage("so-cart", cartItems);

  renderCartContents(cartItems);
  updateCartCount();
}

function removeItem(e) {
  const index = e.target.dataset.index;

  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);

  renderCartContents(cartItems);
  updateCartCount();
}

function setupCheckoutButton() {
  const btn = document.querySelector(".checkout-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.location.href = "/checkout/index.html";
  });
}