// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb3nAzSBTCnPs3-DujUYI2obI4QggVnQQ",
  authDomain: "janki-77e3d.firebaseapp.com",
  projectId: "janki-77e3d",
  storageBucket: "janki-77e3d.appspot.com",
  messagingSenderId: "615124352701",
  appId: "1:615124352701:web:ef4aca5ba53f32d23cc1d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default app;
