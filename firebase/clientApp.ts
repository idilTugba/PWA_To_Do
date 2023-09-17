// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5xRsEwPRwZfjVgjhA9xO-H51SXXeG6ac",
  authDomain: "pwa-to-do-a410a.firebaseapp.com",
  projectId: "pwa-to-do-a410a",
  storageBucket: "pwa-to-do-a410a.appspot.com",
  messagingSenderId: "651245830030",
  appId: "1:651245830030:web:4c9729424072ffcf172edf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };