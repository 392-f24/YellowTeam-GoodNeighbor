import React, { useState } from 'react';
import { Button, DropdownButton } from 'react-bootstrap';
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';
import "./Buttons.css"

  export const GreenButton = ({onClick, text}) => (
    <Button className="green-custom-button" 
    onClick={onClick}
    >{text}</Button> 
  );

  export const GreyButton = ({onClick, text}) => (
    <Button className="grey-custom-button" onClick={onClick}>{text}</Button> 
  );
  
  export const GreyOutlineButton = ({ onClick, text, disabled }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = (e) => {
      if (!disabled) {
        setIsPressed(!isPressed); // Toggle the pressed state
        if (onClick) {
          onClick(e); // Trigger any additional onClick logic passed via props
        }
      }
    };

    return (
      <Button
        className={`grey-outline-custom-button ${isPressed ? 'pressed' : ''}`}
        variant="outline-secondary"
        onClick={handleClick}
        disabled={disabled}
        size="sm"
      >
        {text}
      </Button>
    );
  };

  const AuthButton = () => {
    const [user] = useAuthState();
    return user ? <GreenButton onClick={signOut} text={'Sign out'}/> : <GreenButton onClick={signInWithGoogle} text={'Sign in'} />
  };

  export default AuthButton;