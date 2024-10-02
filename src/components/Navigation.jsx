import { NavLink } from 'react-router-dom';
// import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';
import AuthButton from './Buttons.jsx'

// const SignInButton = () => (
//   // <button className="button" onClick={signInWithGoogle}>Sign in</button>
//   <button type="button" class="btn btn-light" onClick={signInWithGoogle}>Sign in</button>
// );

// const SignOutButton = () => (
//   <button className="button" onClick={signOut}>Sign out</button>
// );

// const AuthButton = () => {
//   const [user] = useAuthState();
//   return user ? <SignOutButton /> : <SignInButton />;
// };

const activation = ({isActive}) => isActive ? 'active' : 'inactive';

const Navigation = () => (
  <nav>
    {/* <NavLink to="/" className={activation} end>Posts</NavLink>
    <NavLink to="/users" className={activation} end>Users</NavLink> */}
    <AuthButton />
  </nav>
);

export default Navigation;