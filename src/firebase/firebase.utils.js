import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyARD8dH3a7VZm-G7P1aR3RmIAmwY_J9vGA",
  authDomain: "nar-hats.firebaseapp.com",
  databaseURL: "https://nar-hats.firebaseio.com",
  projectId: "nar-hats",
  storageBucket: "nar-hats.appspot.com",
  messagingSenderId: "497882361533",
  appId: "1:497882361533:web:a6cd25353c5ce0d608d1d4",
  measurementId: "G-XQ0S0F4GE4"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  
  if(!snapShot.exists) {
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

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;