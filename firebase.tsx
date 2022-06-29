// Import the functions you need from the SDKs you need
import {initializeApp, getApps, getApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
import firebase from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCcqonX0ySy8aJvH2YjUmW0K8FAzb-gsQI',
  authDomain: 'indiancombatclub-9692b.firebaseapp.com',
  projectId: 'indiancombatclub-9692b',
  storageBucket: 'indiancombatclub-9692b.appspot.com',
  messagingSenderId: '225351134209',
  appId: '1:225351134209:web:3dd4dbe7fecbac0b426400',
  measurementId: 'G-9JX6WYXBSL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//intilizing firebase, using this to intilize firebase instance only once
getApps().length === 0 ? app : getApp();
const b = getFirestore(app);

export {app, analytics, db};
