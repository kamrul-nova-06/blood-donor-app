// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6mayjlQHxi73E3zNCEJf9k3zi4yyw8kI",
  authDomain: "blooddonorfinder-d7071.firebaseapp.com",
  projectId: "blooddonorfinder-d7071",
  storageBucket: "blooddonorfinder-d7071.firebasestorage.app",
  messagingSenderId: "1021030775973",
  appId: "1:1021030775973:web:30589a57262adbb244614c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, signInWithPopup };
