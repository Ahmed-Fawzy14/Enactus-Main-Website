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
      <Navbar className={styles.navRoot} expand="lg">
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
            <Nav className={`me-auto ${styles.navLinks}`}>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#about">About Us</Nav.Link>
            </Nav>
            <div className={styles.socials} aria-label="social media links">
              <a
                href="https://www.instagram.com/_enactus_auc_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                {/* Instagram Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://x.com/EnactusAUC"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className={styles.socialLink}
              >
                {/* X / Twitter Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4l7.5 9.5L4.5 20H8l5-5.5L17.5 20H21l-7.5-9.5L19.5 4H16l-4.5 5L7.5 4H4z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/enactus-auc-08a792122/?originalSubdomain=eg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={styles.socialLink}
              >
                {/* LinkedIn Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.02h.05c.53-1 1.82-2.05 3.74-2.05 4 0 4.74 2.63 4.74 6.05V23h-4v-7.08c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.74V23h-4V8z" />
                </svg>
              </a>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <>{children}</>
    </>
  );
}

export default BrandExample;
