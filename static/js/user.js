// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
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

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        //console.log(uid);
       // console.log(displayName);
        $('#user').html(email);
        //console.log(photoURL);
        //console.log(emailVerified);
    } else {
        // User is signed out
        // ...
    }
});

let signout = document.getElementById('signout');
signout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        window.location.href = '/login';
      }).catch((error) => {
        // An error happened.
      });
})