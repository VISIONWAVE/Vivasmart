// assets/js/cart.js

document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<tr><td colspan="5" class="text-center">Cart is empty</td></tr>`;
      cartTotal.textContent = "₦0";
      return;
    }

    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover;"></td>
        <td>${item.name}</td>
        <td>₦${item.price.toLocaleString()}</td>
        <td>
          <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="form-control form-control-sm quantity-input">
        </td>
        <td>₦${subtotal.toLocaleString()}</td>
        <td><button class="btn btn-sm btn-danger remove-btn" data-index="${index}">Remove</button></td>
      `;
      cartItemsContainer.appendChild(row);
    });

    cartTotal.textContent = `₦${total.toLocaleString()}`;
  }

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  cartItemsContainer.addEventListener("change", function (e) {
    if (e.target.classList.contains("quantity-input")) {
      const index = e.target.dataset.index;
      const newQty = parseInt(e.target.value);
      if (newQty > 0) {
        cart[index].quantity = newQty;
        updateCart();
      }
    }
  });

  cartItemsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
    }
  });

  renderCart();
});
// Add event listener for the "Clear Cart" button
document.getElementById("clear-cart").addEventListener("click", function () {
  cart = [];
  updateCart();
});