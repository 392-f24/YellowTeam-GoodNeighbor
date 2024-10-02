import { NavLink } from 'react-router-dom';
import AuthButton from './Buttons.jsx'

const activation = ({isActive}) => isActive ? 'active' : 'inactive';

const Navigation = () => (
  <nav>
    {/* <NavLink to="/" className={activation} end>Posts</NavLink>
    <NavLink to="/users" className={activation} end>Users</NavLink> */}
    <AuthButton />
  </nav>
);

export default Navigation;