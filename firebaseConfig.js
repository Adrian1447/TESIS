import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZt19i4HJdxhPX0c_YM7f-XgtmtL2zv0c",
  authDomain: "tesis-heartapp01.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "tesis-heartapp01",
  storageBucket: "tesis-heartapp01.firebasestorage.app",
  messagingSenderId: "855309946635",
  appId: "1:855309946635:android:9b68f7fd5cf4015d6f1c0e",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
