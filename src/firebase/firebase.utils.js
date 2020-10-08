import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD0Og8AXQgl9Wi3G-LP66l6VhjW9K6fVSs",
    authDomain: "crwn-db-d50ae.firebaseapp.com",
    databaseURL: "https://crwn-db-d50ae.firebaseio.com",
    projectId: "crwn-db-d50ae",
    storageBucket: "crwn-db-d50ae.appspot.com",
    messagingSenderId: "680685336031",
    appId: "1:680685336031:web:10e4115a4f552ac260c06a",
    measurementId: "G-2PMKCZ4HVW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;