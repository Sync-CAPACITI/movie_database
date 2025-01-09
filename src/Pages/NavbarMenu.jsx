import React, { useRef, useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
//import logo from '../../assets/tmovie.png'; // Adjust path as needed
import '../Pages/NavbarMenu.css'; // Your CSS file

const navItems = [
  { display: 'Home', path: '/' },
  { display: 'Movies', path: '/movie' },
  { display: 'TV Series', path: '/tv' },
  { display: 'Watch History', path: '/history' }, // Added from NavbarMenu
  { display: 'Contact', path: '/contact' },       // Added from NavbarMenu
];

const NavbarMenu = () => {
  const [shrink, setShrink] = useState(false);
  const headerRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar 
        ref={headerRef} 
        className={`navbar ${shrink ? 'shrink' : ''}`} 
        bg="dark" 
        variant="dark" 
        expand="lg" 
        sticky="top"
    >
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="tMovies Logo" style={{ height: '30px', marginRight: '10px' }} />
          tMovies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navItems.map((item, index) => (
              <Nav.Link key={index} href={item.path}>{item.display}</Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;

