import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
console.log(app); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
