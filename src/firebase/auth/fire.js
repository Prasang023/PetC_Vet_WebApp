import firebase from 'firebase'
import "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import * as firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyClXhseBYZuksVuWTUYmCwaKW48jgmBdBY",
  authDomain: "petc-3d57a.firebaseapp.com",
  projectId: "petc-3d57a",
  databaseURL:'https://petc-3d57a-default-rtdb.firebaseio.com/',
  storageBucket: "petc-3d57a.appspot.com",
  messagingSenderId: "649225475203",
  appId: "1:649225475203:web:bd8d3491176384532677b6"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

export default fire;  
