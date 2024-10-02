import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';
import "./Buttons.css"

const SignInButton = () => (
    // <div className='sign-in-button'>
            <button type="button" class="btn sign-in-button" onClick={signInWithGoogle}>Sign in</button>
    // </div>
  );
  
  const SignOutButton = () => (
    <button type="button" class="btn btn-light" onClick={signOut}>Sign out</button>
  );
  
  const AuthButton = () => {
    const [user] = useAuthState();
    return user ? <SignOutButton /> : <SignInButton />;
  };

  export default AuthButton;