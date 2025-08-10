// assets/js/add-to-cart.js

document.addEventListener("DOMContentLoaded", function () {
  const addToCartBtn = document.querySelector(".add-to-cart-btn");

  if (!addToCartBtn) return;

  addToCartBtn.addEventListener("click", function () {
    const product = {
      name: this.dataset.name,
      price: parseInt(this.dataset.price),
      image: this.dataset.image,
      quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.name === product.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  });
});
// assets/js/cart.js