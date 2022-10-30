import React from "react";
import { Button, Container, Nav, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import headerImage from "../../images/img2.webp";
import aboutImage from "../../images/img1.jpg";
import { useAuth } from "../../context/AuthContext";
export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Container>
        <Nav className="bg-light d-flex align-items-center justify-content-center mt-4">
          <p style={{ fontWeight: "600", fontSize: "24px" }} className="text-primary">
            Handle Your Business
          </p>
        </Nav>
        <div className="d-flex flex-column flex-column-reverse align-items-center justify-content-center">
          <div className="align-items-center">
            <h3 className="text-danger">
              Hey! Wanna manage <br />
            </h3>
            <h3 className="text-primary mt-1">Your business Cards?</h3>
            <h4 className="text-secondary mt-3 mb-3">Let me help you </h4>
            {currentUser ? (
              <Button variant="dark" onClick={() => navigate('/contact-list')}>Go To Home</Button>
            ) : (
              <>
                <Button variant="primary" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
                <Button
                  variant="success"
                  className="mx-2"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
              </>
            )}
          </div>
          <div>
            <img src={aboutImage} width={400} height={400} alt="Image" />
          </div>
					<h1 style={{fontWeight: "800", fontSize: "2rem"}}>Welcome!</h1>
        </div>
      </Container>
    </div>
  );
}
