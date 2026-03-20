import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import updateCartCount from "./cartCount.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, element);

productList.init();
