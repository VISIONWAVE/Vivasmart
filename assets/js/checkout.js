import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Init EmailJS
emailjs.init("5EvnGcBSsW2DxGEt6"); // Replace with your EmailJS public key

// Load cart
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const summaryEl = document.getElementById("orderSummary");
const totalEl = document.getElementById("orderTotal");
let total = 0;

// Show cart items
cart.forEach(item => {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.innerHTML = `${item.name} (x${item.quantity || 1}) <span>₦${(item.price * (item.quantity || 1)).toLocaleString()}</span>`;
  summaryEl.appendChild(li);
  total += item.price * (item.quantity || 1);
});
totalEl.textContent = total.toLocaleString();

// Handle Checkout
document.getElementById("checkoutForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("✅ Checkout form submitted");

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  try {
    const orderRef = await addDoc(collection(db, "orders"), {
      name, email, phone, address,
      items: cart,
      total,
      status: "Pending",
      createdAt: serverTimestamp()
    });

    console.log("✅ Order saved:", orderRef.id);
    payWithPaystack(orderRef.id, name, email, total, cart);

  } catch (err) {
    alert("❌ Firestore error: " + err.message);
  }
});

// Paystack Integration
function payWithPaystack(orderId, name, email, total, cart) {
  let handler = PaystackPop.setup({
    key: "pk_test_fb80d551bdcc344f4648762a479d470f9f56abaf",
    email: email,
    amount: total * 100,
    currency: "NGN",
    callback: function(response) {
      updateDoc(doc(db, "orders", orderId), {
        status: "Paid",
        transactionRef: response.reference
      }).then(() => {
        document.getElementById("receiptDetails").innerHTML =
          `<strong>Order ID:</strong> ${orderId}<br>
           <strong>Name:</strong> ${name}<br>
           <strong>Email:</strong> ${email}<br>
           <strong>Total:</strong> ₦${total.toLocaleString()}<br>
           <strong>Status:</strong> Paid<br>
           <strong>Transaction Ref:</strong> ${response.reference}`;
        document.getElementById("receipt").style.display = "block";

        localStorage.removeItem("cart");
        sendReceipt(orderId, name, email, cart, total, response.reference);
      }).catch(err => alert("❌ Firestore update failed: " + err.message));
    },
    onClose: function() {
      alert("❌ Payment cancelled");
    }
  });
  handler.openIframe();
}

// Email Receipt
function sendReceipt(orderId, name, email, cart, total, reference){
  const itemsList = cart.map(i => `${i.name} (x${i.quantity || 1})`).join(", ");
  emailjs.send("service_xiiwskd", "template_y670g62", {
    order_id: orderId,
    name: name,
    email: email,
    items: itemsList,
    total: `₦${total.toLocaleString()}`,
    reference: reference
  }).then(() => {
    console.log("📧 Receipt sent");
  }).catch(err => console.error("❌ EmailJS error:", err));
}
// Show receipt 
    