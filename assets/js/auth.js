// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "import.meta.env.VITE_FIREBASE_API_KEY",
  authDomain: "import.meta.env.VITE_FIREBASE_AUTH_DOMAIN",
  projectId: "import.meta.env.VITE_FIREBASE_PROJECT_ID",
  storageBucket: "import.meta.env.VITE_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID",
  appId: "import.meta.env.VITE_FIREBASE_APP_ID",
  measurementId: "import.meta.env.VITE_FIREBASE_MEASUREMENT_ID"
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
