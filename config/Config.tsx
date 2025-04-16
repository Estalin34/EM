import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUaND4mmqmftfokfS3Iq_Bz37XZ0n4Bsk",
  authDomain: "app-tare1.firebaseapp.com",
  databaseURL: "https://app-tare1-default-rtdb.firebaseio.com",
  projectId: "app-tare1",
  storageBucket: "app-tare1.firebasestorage.app",
  messagingSenderId: "166311231769",
  appId: "1:166311231769:web:12b2999a3d74a724bac588"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);