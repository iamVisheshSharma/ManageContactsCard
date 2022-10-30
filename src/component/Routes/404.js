import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import notfound from '../../images/404.jpg';

export default function NotFound() {
	const navigate = useNavigate();
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: 'white' }}
    >
			<img src={notfound} width="400" height="400" alt="oops image also not found..."/>
			<h1>Oops!</h1>
			<h1>404 Page is not found...</h1>
      <Button
        className="w-50 mt-4"
        variant="dark"
        onClick={() => navigate("/contact-list")}
      >
        Back To Home
      </Button>
    </div>
  );
}
