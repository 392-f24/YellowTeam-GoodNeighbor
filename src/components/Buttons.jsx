import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

const SignInButton = () => (
    <button type="button" class="btn btn-light" onClick={signInWithGoogle}>Sign in</button>
  );
  
  const SignOutButton = () => (
    <button className="button" onClick={signOut}>Sign out</button>
  );
  
  const AuthButton = () => {
    const [user] = useAuthState();
    return user ? <SignOutButton /> : <SignInButton />;
  };

  export default AuthButton;