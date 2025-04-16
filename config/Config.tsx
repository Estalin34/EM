import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvMu-rsQd-3dq7Tnfo65iGJW4x3BoerBU",
  authDomain: "movilesii-3c683.firebaseapp.com",
  databaseURL: "https://movilesii-3c683-default-rtdb.firebaseio.com",
  projectId: "movilesii-3c683",
  storageBucket: "movilesii-3c683.firebasestorage.app",
  messagingSenderId: "109515507669",
  appId: "1:109515507669:web:00a95f4f84870b87e21f5c"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);