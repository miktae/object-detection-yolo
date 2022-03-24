// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZzg5RE-EOg58zx1zdS1VIxt09yEs26pc",
  authDomain: "scientific-research-6982c.firebaseapp.com",
  databaseURL: "https://scientific-research-6982c-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "scientific-research-6982c",
  storageBucket: "scientific-research-6982c.appspot.com",
  messagingSenderId: "324259018136",
  appId: "1:324259018136:web:15ac83665d10875bc067ed",
  measurementId: "G-7GYQ3K5RDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

let email = document.getElementById('email');
let password = document.getElementById('pass');
let form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('submit'); 
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      console.log('Signed in');
      const user = userCredential.user;
      window.location.href = 'http://127.0.0.1:5000/';
      sessionStorage.setItem('Auth Token',
       userCredential._tokenResponse)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      // ..
    });
})
