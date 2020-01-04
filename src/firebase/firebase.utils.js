import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB9cHn8Y15zfYUHPBepS2jnYxSZyM2VhPI",
  authDomain: "crwn-db-a7278.firebaseapp.com",
  databaseURL: "https://crwn-db-a7278.firebaseio.com",
  projectId: "crwn-db-a7278",
  storageBucket: "crwn-db-a7278.appspot.com",
  messagingSenderId: "239543506929",
  appId: "1:239543506929:web:d32857eb71eb7322115650",
  measurementId: "G-L03NG08PJZ"
};

firebase.initializeApp(config);

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
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
