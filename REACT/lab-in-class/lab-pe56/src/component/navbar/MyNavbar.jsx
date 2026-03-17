import React from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function MyNavbar() {
  return (
    <BootstrapNavbar expand="lg" className="custom-navbar sticky-top">
      <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/">
          Trhgam System
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/all-lessons">
              All Lessons
            </Nav.Link>
            <Nav.Link as={NavLink} to="/completed-lessons">
              Completed Lessons
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add">
              Add Lesson
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
