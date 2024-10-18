import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css';

const Header = () => {
  return (
    <Navbar bg="light" className="header-navbar fixed-top justify-content-center">
      <Container className="d-flex justify-content-center">
        <Navbar.Brand href="/" className="text-center d-flex align-items-center">
          <i className="bi bi-house-door-fill" style={{ fontSize: '2rem', color: '#4B7260' }}></i>
          <span className="ms-3 good-neighbor-text">Good Neighbor</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
