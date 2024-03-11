// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL48XY8uUXSVDtWOnbnEgptoBE3I6Nr90",
  authDomain: "green-biz-technology-sch-58fb8.firebaseapp.com",
  projectId: "green-biz-technology-sch-58fb8",
  storageBucket: "green-biz-technology-sch-58fb8.appspot.com",
  messagingSenderId: "124295713356",
  appId: "1:124295713356:web:760137fec1bf2ed5a2dae9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const imgDb = getStorage(app);
export default app;