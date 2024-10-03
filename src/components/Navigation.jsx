import { NavLink } from 'react-router-dom';
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';
import './Navigation.css'

const Navbar = () => {
  const activeLink = "bg-blue-100 text-black";
  const normalLink = "text-white"; // You may want to keep the normal link style

  return (
    <section>
      <div className="bottom-nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <p className="nav-link">Home</p>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <p className="nav-link">Profile</p>
        </NavLink>
        <NavLink
          to="/requests"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <p className="nav-link">Requests</p>
        </NavLink>
      </div>
    </section>
  );
};

export default Navbar;
