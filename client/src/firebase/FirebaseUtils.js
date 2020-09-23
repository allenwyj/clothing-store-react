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
// If the user is not in the firebase, it will create a new user document.
// If the user is already in the firebase, it will simply return the user document.
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
    // Creating a new user and saving it into the firebase
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

// TODO: ONLY FOR DEVELOPMENT PURPOSE!!!
// Adding documents into the collection in the firebase
// collectionKey: the name of collection in the firebase
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  // setting the batch  object and allow us to process all calls in one big calls.
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    // creating a new document ref with empty string and generating an random document id
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  // batch.commit() is a promise function, and we want to reuse its return
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  // storing the collections data as an array from the firestore
  const transformedCollection = collections.docs.map(doc => {
    // destructuring the data from each document
    const { title, items } = doc.data();

    // having the similar data structure for the values in ShopData.js
    return {
      routeName: encodeURI(title.toLowerCase()), // encode the title
      id: doc.id,
      title,
      items
    };
  });

  // converting the array to the object that we used in redux
  return transformedCollection.reduce((accumulator, collection) => {
    // using the collection's title as the key, and storing the current collection as the value.
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// This method is to handle fetching the current sign-in user status
// It will use promise to get userAuth shortly from auth, then unsubscribe immediately.
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

// initialise Firebase
firebase.initializeApp(firebaseConfig);

// export Firebase authentication
export const auth = firebase.auth();

// export Firebase cloud Firestore db
export const firestore = firebase.firestore();

// create an instance of the Google provider object
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// always trigger the Google pop up
googleProvider.setCustomParameters({ prompt: ' select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
