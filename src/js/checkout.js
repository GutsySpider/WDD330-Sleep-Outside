import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cartItems = getLocalStorage("so-cart") || [];

const subtotalEl = document.querySelector(".subtotal");
const taxEl = document.querySelector(".tax");
const shippingEl = document.querySelector(".shipping");
const finalTotalEl = document.querySelector(".final-total");
const placeOrderBtn = document.querySelector(".place-order-btn");

let subtotal = cartItems.reduce((sum, item) => {
  const qty = item.quantity || 1;
  return sum + item.FinalPrice * qty;
}, 0);

let tax = subtotal * 0.06;

let totalItems = cartItems.reduce((sum, item) => {
  const qty = item.quantity || 1;
  return sum + qty;
}, 0);

let shipping = totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;

let finalTotal = subtotal + tax + shipping;

subtotalEl.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
taxEl.textContent = `Tax (6%): $${tax.toFixed(2)}`;
shippingEl.textContent = `Shipping: $${shipping.toFixed(2)}`;
finalTotalEl.textContent = `Final Total: $${finalTotal.toFixed(2)}`;

placeOrderBtn.addEventListener("click", () => {
  const order = {
    items: cartItems,
    subtotal,
    tax,
    shipping,
    finalTotal,
    date: new Date().toISOString(),
  };

  localStorage.setItem("so-order", JSON.stringify(order));
  localStorage.removeItem("so-cart");

  window.location.href = "/confirmation/index.html";
});