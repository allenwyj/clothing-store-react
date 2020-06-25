import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// setup the connection between the app and firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBMJpnKTds40_LiHpPoFBzM_xHWyiT2JLk',
  authDomain: 'crwn-clothing-project.firebaseapp.com',
  databaseURL: 'https://crwn-clothing-project.firebaseio.com',
  projectId: 'crwn-clothing-project',
  storageBucket: 'crwn-clothing-project.appspot.com',
  messagingSenderId: '238230231584',
  appId: '1:238230231584:web:8dee35ff6a0e80e9e53a45',
  measurementId: 'G-79PVEFCKY5'
};

// userAuth and additionalData are the object type.
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // no current login user, exit the func
  if (!userAuth) return;

  // get document ref by using login user id.
  // no matter the current user exists in the db or not, it will return a documentRef
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // fetch the login user documentSnapshot object
  const snapShot = await userRef.get();

  // if the current login user is not in the firebase, we will handle the user creation.
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      // create and store the current user into the firebase.
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (e) {
      console.log('Error in creating user', e.message);
    }
  }

  return userRef;
};

// initialise Firebase
firebase.initializeApp(firebaseConfig);

// export Firebase authentication
export const auth = firebase.auth();

// export Firebase cloud Firestore db
export const firestore = firebase.firestore();

// create an instance of the Google provider object
const provider = new firebase.auth.GoogleAuthProvider();

// always trigger the Google pop up
provider.setCustomParameters({ prompt: ' select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
