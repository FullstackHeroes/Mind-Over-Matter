import firebase from "firebase/app";
import 'firebase/database';
// PERSONAL FIREBASE CONFIGURATION
var firebaseConfig = {
  apiKey: 'AIzaSyAge0F4hnrIf5lOXb4hW8CvZwCqgZqoG9M',
  authDomain: 'mind-over-matter-5ee6a.firebaseapp.com',
  databaseURL: 'https://mind-over-matter-5ee6a.firebaseio.com',
  projectId: 'mind-over-matter-5ee6a',
  storageBucket: 'mind-over-matter-5ee6a.appspot.com',
  messagingSenderId: '536926014550',
  appId: '1:536926014550:web:e446bad28a88b1f984fff7',
  measurementId: 'G-ETK41B9X1V',
};
// INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig);
const fbDatabase = firebase.database();
export { firebase, fbDatabase as default };
