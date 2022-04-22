// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// allows us to access database
import { getFirestore } from "firebase/firestore";
// for img and posts storage
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
// check is a next-js thing, if getApps is already initialized than getApp() else initializeApp
// After you initialize a Firebase App object in your code, you can add and start using Firebase services.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// initialize DataBase in our project
const firestore = getFirestore(app)
// initialize Authentication in our project
// this variable will be populated with info from the google acc. which logged in.
const auth = getAuth(app)
const storage = getStorage(app)

export default app
export {app, auth, firestore, storage }