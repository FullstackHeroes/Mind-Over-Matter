import React from 'react';
import logo from '../images/logo.svg';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

function App() {
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

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
