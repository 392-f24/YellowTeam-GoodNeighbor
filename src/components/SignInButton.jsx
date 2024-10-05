import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../utilities/firebase';
import "./Buttons.css";

const SignInButton = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle(); // Authenticate with Google
      navigate('/home'); // Navigate to homepage after successful sign-in
    } catch (error) {
      console.error("Sign-in failed", error);
    }
  };

  return (
    <button type="button" className="sign-in-button" onClick={handleSignIn}>
      Sign in
    </button>
  );
};

export default SignInButton;
