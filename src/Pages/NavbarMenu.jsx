import React, { useRef, useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { IoPlayBackOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import '../Pages/NavbarMenu.css'; // Your CSS file

const navItems = [
  { display: 'Home', path: '/', icon: <FaHome /> },
  { display: 'Watch History', path: '/history', icon: <IoPlayBackOutline /> },
  { display: 'Rate Movie', path: '/Rate', icon: <FaRegStarHalfStroke /> },
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
      <Navbar.Brand href="/">
        <h4> Reel Movies </h4>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {navItems.map((item, index) => (
            <Nav.Link key={index} href={item.path} className="d-flex align-items-center">
              {item.icon} {/* Icon here */}
              <span className="ms-2">{item.display}</span> {/* Adding a small margin for spacing between icon and text */}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
