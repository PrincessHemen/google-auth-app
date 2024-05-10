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
    <div className="box">
       <div className="container">
      <h1 className='title'>Google Auth with Firebase <span>React JS Web App</span></h1>
      {!isLoggedIn && <button className='button' onClick={handleSignIn}>Sign In With Google</button>}
      {isLoggedIn && (
        <React.Fragment>
          <button className='button' onClick={handleSignOut}>Sign Out</button>
          <h2 className='profile'>{name}</h2>
          <h2 className='profile'>{email}</h2>
          <img className='profile' src={profilePic} alt="logged in user's profile picture" />
        </React.Fragment>
      )}
      {!name && !email && !profilePic && <h3 className='not-logged-in'>Not Logged In</h3>}
    </div>      
    </div>

  );
};

export default Auth;