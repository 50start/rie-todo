import firebase from "firebase";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVTDJXgIloSZVwBKuimjOs2SeORdaSDMc",
  authDomain: "react-todo-rie.firebaseapp.com",
  projectId: "react-todo-rie",
  storageBucket: "react-todo-rie.appspot.com",
  messagingSenderId: "937695881627",
  appId: "1:937695881627:web:d935be666d63159fca593e",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  firebase
    .auth()
    .signInWithPopup(googleProvider) //googleProviderをpopupしますよ
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const logOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("logged out");
      document.location.reload();
    })
    .catch((error) => {
      console.log(error.message);
    });
};
