import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js'

// Add Firebase products that you want to use
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js'
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
} from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js'
const firebaseConfig = {
  apiKey: 'AIzaSyAPrNIc_STwgScLfFOfEN8YyGENoHfT6T4',
  authDomain: 'ghost-d319b.firebaseapp.com',
  projectId: 'ghost-d319b',
  storageBucket: 'ghost-d319b.firebasestorage.app',
  messagingSenderId: '162890047542',
  appId: '1:162890047542:web:d7ed1c15e94469e0663897',
  measurementId: 'G-VCKQCEBVRJ',
}

// Initialize Firebase
// FIRE BASE SETUP

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore()

window.firebase = {
  auth,
  db,
  app,
  analytics,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getDocs,
  getDoc,
  collection,
  query,
  where,
  doc,
}

window.firebase.redirectIfNotLoggedIn = function (path) {
  window.firebase.onAuthStateChanged(window.firebase.auth, (user) => {
    if (!user) {
      // redirect to 'artist-sign-on' page
      window.location.href = path;

    }
  })
}
