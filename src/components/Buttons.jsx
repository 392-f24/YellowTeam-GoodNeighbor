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
  
  const AuthButton = () => {
    const [user] = useAuthState();
    // return user ? <SignOutButton /> : <SignInButton />;
    return user ? <GreenButton onClick={signOut} text={'Sign out'}/> : <GreenButton onClick={signInWithGoogle} text={'Sign in'} />
  };

  export default AuthButton;