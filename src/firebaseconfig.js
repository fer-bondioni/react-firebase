import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyCDY13A1Bvp4WH7BurLidrgDY8UvmivfNw",
  authDomain: "fire-react-86da7.firebaseapp.com",
  projectId: "fire-react-86da7",
  storageBucket: "fire-react-86da7.appspot.com",
  messagingSenderId: "990355105872",
  appId: "1:990355105872:web:88a5f61f03f5ce72524955",
  measurementId: "G-JLZLDG6YG2",
});

const db = getFirestore(firebaseConfig);
const auth = getAuth(firebaseConfig);

export { db, auth };
