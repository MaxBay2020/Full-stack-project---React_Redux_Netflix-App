// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBektYUGRyNZWAdKZcx3R2hr_CpVZUtQm8",
    authDomain: "netflix-ac873.firebaseapp.com",
    projectId: "netflix-ac873",
    storageBucket: "netflix-ac873.appspot.com",
    messagingSenderId: "433279687725",
    appId: "1:433279687725:web:1af5e2537690b5ddf36ca4",
    measurementId: "G-B7L75KB5D0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db=getFirestore(app)
export const auth = getAuth(app)


