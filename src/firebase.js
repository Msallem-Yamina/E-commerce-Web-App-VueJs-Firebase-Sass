/* eslint-disable */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWat3-E8kmuFwhW2bjXoCEfwszA1-dxCw",
  authDomain: "e-shop-a0940.firebaseapp.com",
  projectId: "e-shop-a0940",
  storageBucket: "e-shop-a0940.appspot.com",
  messagingSenderId: "328024396446",
  appId: "1:328024396446:web:a8c9798741e66c470f618f",
  measurementId: "G-NZEVTJJQVY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore();


export default { app, analytics, db};
