// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";
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
const storage = getStorage(app);
// Create a storage reference from our storage service
const storageRef = ref(storage, 'images/1.png');


// Uploads a file and metadata.
uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
});