import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBpl5ZgxXc3YlBT3YOtSI962mKgGJzQ62I",
    authDomain: "travel-list-89585.firebaseapp.com",
    databaseURL: "https://travel-list-89585-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "travel-list-89585",
    storageBucket: "travel-list-89585.appspot.com",
    messagingSenderId: "668550676026",
    appId: "1:668550676026:web:0083f07e602caf5daa3f03"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  export default app;