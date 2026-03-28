import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const order = JSON.parse(localStorage.getItem("so-order"));
const container = document.querySelector(".order-summary");

if (!order) {
  container.innerHTML = "<p>No order found.</p>";
} else {
  const itemsHTML = order.items
    .map((item) => {
      const qty = item.quantity || 1;
      const lineTotal = item.FinalPrice * qty;
      return `
        <li>
          ${item.Name} — Qty: ${qty} — $${lineTotal.toFixed(2)}
        </li>
      `;
    })
    .join("");

  container.innerHTML = `
    <h3>Order Details</h3>
    <ul>${itemsHTML}</ul>

    <p>Subtotal: $${order.subtotal.toFixed(2)}</p>
    <p>Tax: $${order.tax.toFixed(2)}</p>
    <p>Shipping: $${order.shipping.toFixed(2)}</p>
    <hr />
    <p><strong>Total Paid: $${order.finalTotal.toFixed(2)}</strong></p>
    <p>Order Date: ${new Date(order.date).toLocaleString()}</p>
  `;
}