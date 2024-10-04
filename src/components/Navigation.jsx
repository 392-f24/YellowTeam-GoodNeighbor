import { NavLink } from 'react-router-dom';
// import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';
import './Navigation.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import house from './images/house-door.svg';


const Navigationbar = () => {
  return (
    <Navbar fixed="bottom" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src={house} 
            className="d-inline-block align-top"
          />
          <text className="good-neighbor">Good Neighbor</text>  
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link>
              <NavLink to="/">
                Home
              </NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink to="/profile">
                Profile
              </NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink to="/requests">
                Requests
              </NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  // Lihn's original code
  // I'm leaving it in because I wasn't able to get the isActive working in the bootstrap react navbar
  // but navigation still seems to work well
  
  // const activeLink = "bg-blue-100 text-black";
  // const normalLink = "text-white"; // You may want to keep the normal link style

  // return (
  //   <section>
  //     <div className="bottom-nav">
  //       <NavLink
  //         to="/"
  //         className={({ isActive }) => (isActive ? activeLink : normalLink)}
  //       >
  //         <p className="nav-link">Home</p>
  //       </NavLink>
  //       <NavLink
  //         to="/profile"
  //         className={({ isActive }) => (isActive ? activeLink : normalLink)}
  //       >
  //         <p className="nav-link">Profile</p>
  //       </NavLink>
  //       <NavLink
  //         to="/requests"
  //         className={({ isActive }) => (isActive ? activeLink : normalLink)}
  //       >
  //         <p className="nav-link">Requests</p>
  //       </NavLink>
  //     </div>
  //   </section>
  // );
};

export default Navigationbar;
