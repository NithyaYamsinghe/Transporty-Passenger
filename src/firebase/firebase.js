// IT18233704 - N.R Yamasinghe Version-01
import * as firebase from "firebase/app";
import "firebase/auth"; // for authorization
import "firebase/database"; // for database
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCV-bheA63QRk5X_-V168cv9OKEpCM2zf8",
  authDomain: "transporty-e3217.firebaseapp.com",
  databaseURL: "https://transporty-e3217.firebaseio.com",
  projectId: "transporty-e3217",
  storageBucket: "transporty-e3217.appspot.com",
  messagingSenderId: "261373869116",
  appId: "1:261373869116:web:adca6522ef1697209a5739",
  measurementId: "G-YPPKVBRV5V",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
