import { getLocalStorage } from "./utils.mjs";

export default function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const count = cart.length;

  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.textContent = count > 0 ? count : "";
  }
}