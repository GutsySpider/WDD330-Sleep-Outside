import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import updateCartCount from "./cartCount.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init();
