// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

//these details inside firebaseApp was taken from firebase config file.
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBpT9Sv8a5f9JnapLK6RjO2TJhXbSMp9Ik",
  authDomain: "todo-app-52725.firebaseapp.com",
  projectId: "todo-app-52725",
  storageBucket: "todo-app-52725.appspot.com",
  messagingSenderId: "427979511354",
  appId: "1:427979511354:web:3422ac4df2dab207c88703",
  measurementId: "G-VWM5YKEJ68",
});

const db = firebaseApp.firestore();

export default db;
