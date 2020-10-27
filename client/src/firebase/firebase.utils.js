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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

export const getUserCartRef = async userId => {
  const cartRef = firestore.collection('carts').where('userId', '==', userId);
  const snapShot = await cartRef.get();

  if(snapShot.empty) {
    const cartDocRef = firestore.collection('carts').doc();
    await cartDocRef.set({userId, cartItems: []});
    return cartDocRef;
  }
  else {
    return snapShot.docs[0].ref;
  }
};

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  
  // mechanism to make everething in 1 call to prevent sending half request (on network connection issues for example)
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  } , {});
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;