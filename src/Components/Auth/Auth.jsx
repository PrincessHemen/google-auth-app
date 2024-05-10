import React, { useState, useEffect } from 'react';
import './Auth.css';
import { signInWithGoogle, signOutUser } from '../../Firebase';

const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const profilePic = localStorage.getItem('profilePic');

    if (name && email && profilePic) {
      setIsLoggedIn(true);
      setName(name);
      setEmail(email);
      setProfilePic(profilePic);
    }
  }, []);

  const handleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        const profilePic = localStorage.getItem('profilePic');

        setIsLoggedIn(true);
        setName(name);
        setEmail(email);
        setProfilePic(profilePic);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        setIsLoggedIn(false);
        setName('');
        setEmail('');
        setProfilePic('');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div>
      <h1>Google Auth with Firebase App</h1>
      {!isLoggedIn && <button onClick={handleSignIn}>Sign In With Google</button>}
      {isLoggedIn && (
        <React.Fragment>
          <button onClick={handleSignOut}>Sign Out</button>
          <h2>{name}</h2>
          <h2>{email}</h2>
          <img src={profilePic} alt="logged in user's profile picture" />
        </React.Fragment>
      )}
      {!name && !email && !profilePic && <h3>Not Logged In</h3>}
    </div>
  );
};

export default Auth;