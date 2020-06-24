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

// initialise Firebase
firebase.initializeApp(firebaseConfig);

// export Firebase authentication
export const auth = firebase.auth();

// export  Firebase cloud Firestore
export const firestore = firebase.firestore();

// create an instance of the Google provider object
const provider = new firebase.auth.GoogleAuthProvider();

// always trigger the Google pop up
provider.setCustomParameters({ prompt: ' select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;