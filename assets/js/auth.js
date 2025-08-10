// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBw5DaGdr-8Ibon6sRhJMb3bAIWMgz4w-8",
  authDomain: "vivasmart-4588f.firebaseapp.com",
  projectId: "vivasmart-4588f",
  storageBucket: "vivasmart-4588f.firebasestorage.app",
  messagingSenderId: "815227488896",
  appId: "1:815227488896:web:005f22c99d90d5168cb465",
  measurementId: "G-3NNSR3J1Y5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// UI Elements
const logoutBtn = document.getElementById("logoutBtn");
const userEmail = document.getElementById("userEmail");

// Check login status
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmail.textContent = `Hello, ${user.email}`;
    logoutBtn.style.display = "inline-block";
  } else {
    userEmail.textContent = "";
    logoutBtn.style.display = "none";
    if (window.location.pathname !== "/login.html") {
      window.location.href = "login.html"; // Redirect if not logged in
    }
  }
});

// Logout action
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Logout Error:", error);
  });
});
