import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";
import updateCartCount from "./cartCount.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

const dataSource = new ProductData("tents");

const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);

product.init();
