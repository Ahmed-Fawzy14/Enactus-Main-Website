import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styles from "./Navbar.module.css";
import enactus_logo from "../Images/Enactus_Logo.png";

interface NavBarProps {
  children: React.ReactNode;
}

function BrandExample({ children }: NavBarProps) {
  return (
    <>
      <Navbar className={styles.transparentNavBar}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={enactus_logo}
              width="60"
              height="60"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#about">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <>{children}</>
    </>
  );
}

export default BrandExample;
