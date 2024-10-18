import { NavLink } from 'react-router-dom';
import './Navigation.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigationbar = () => {
  return (
    <Navbar fixed="bottom" className="bg-light border-top">
      <Container className="d-flex justify-content-around">
        <Nav className="w-100 d-flex justify-content-between">
          <Nav.Link as={NavLink} to="/" className="nav-icon" activeClassName="active">
            <i className="bi bi-house-door-fill"></i>
            <p>Home</p>
          </Nav.Link>

          <Nav.Link as={NavLink} to="/profile" className="nav-icon" activeClassName="active">
            <i className="bi bi-person-fill"></i>
            <p>Profile</p>
          </Nav.Link>

          <Nav.Link as={NavLink} to="/requests" className="nav-icon" activeClassName="active">
            <i className="bi bi-list-task"></i>
            <p>Requests</p>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
