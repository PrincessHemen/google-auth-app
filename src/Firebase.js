// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'; 
import { browserSessionPersistence, setPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzsBCVPsQ9YuQVWSNU8F8E4M-MGp729RM",
  authDomain: "auth-e5ad8.firebaseapp.com",
  projectId: "auth-e5ad8",
  storageBucket: "auth-e5ad8.appspot.com",
  messagingSenderId: "863279056254",
  appId: "1:863279056254:web:b568226001c363fc6c1f2f",
  measurementId: "G-LWJC134MGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app); 

const provider = new GoogleAuthProvider();

// Configure session persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session persistence set to browser session");
  })
  .catch((error) => {
    console.error("Error setting session persistence:", error);
  });

  export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
  
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('profilePic', profilePic);
  
        console.log(result);
        alert("Sign-in successful");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  };
  
  export const signOutUser = () => {
    return signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('profilePic');
        console.log("Sign-out successful");
        alert("Sign-out successful");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
        alert("Error signing out: " + error); 
      });
  };
