// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXk6V2s1Ki5pBsAFElXdU41tH4L0aB1nI",
  authDomain: "react-social-media-4af39.firebaseapp.com",
  projectId: "react-social-media-4af39",
  storageBucket: "react-social-media-4af39.appspot.com",
  messagingSenderId: "591325253301",
  appId: "1:591325253301:web:0f0795e67c54570848b8fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app)
export const provider = new GoogleAuthProvider()