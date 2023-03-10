import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuAJuADGgjDuQI7xkJsaVPKmO725R2jKw",
  authDomain: "crud-app-dbda4.firebaseapp.com",
  projectId: "crud-app-dbda4",
  storageBucket: "crud-app-dbda4.appspot.com",
  messagingSenderId: "644832372111",
  appId: "1:644832372111:web:36ea257b5aca2fcba697fa",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
