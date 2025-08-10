import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBw5DaGdr-8Ibon6sRhJMb3bAIWMgz4w-8",
  authDomain: "vivasmart-4588f.firebaseapp.com",
  projectId: "vivasmart-4588f",
  storageBucket: "vivasmart-4588f.firebasestorage.app",
  messagingSenderId: "815227488896",
  appId: "1:815227488896:web:005f22c99d90d5168cb465",
  measurementId: "G-3NNSR3J1Y5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "index.html";
  }
});

// Toggle between login and signup
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const toggleLink = document.getElementById("toggle-link");
const formTitle = document.getElementById("form-title");
const toggleText = document.getElementById("toggle-text");

toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    formTitle.innerText = "Login";
    toggleText.innerHTML = `Don't have an account? <a href="#" id="toggle-link">Sign Up</a>`;
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    formTitle.innerText = "Sign Up";
    toggleText.innerHTML = `Already have an account? <a href="#" id="toggle-link">Login</a>`;
  }
});

// Handle Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login Successful!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Login Failed: " + error.message);
  }
});

// Handle Signup
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account Created Successfully!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Signup Failed: " + error.message);
  }
});
