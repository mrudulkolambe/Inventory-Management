import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import 'dotenv/config'
// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyDhKPg5fuT93drP7tQr105EfuZE11WWj1E",
  authDomain: "sigce-inventory-management.firebaseapp.com",
  projectId: "sigce-inventory-management",
  storageBucket: "sigce-inventory-management.appspot.com",
  messagingSenderId: "610985613901",
  appId: "1:610985613901:web:e197c6327ee845bf23da04"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
