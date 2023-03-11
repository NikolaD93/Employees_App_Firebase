import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeZ5ofk1-6VMaVbdi9z7x4vIsUF3S2NTQ",
  authDomain: "crud-app-58c6e.firebaseapp.com",
  projectId: "crud-app-58c6e",
  storageBucket: "crud-app-58c6e.appspot.com",
  messagingSenderId: "595415436894",
  appId: "1:595415436894:web:874f22f84108681efbaecf",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
