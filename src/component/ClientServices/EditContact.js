import React, { useRef, useState, useEffect } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import contactServicices from "../services/contact.servicices";
import { useParams, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

export default function EditContact(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  let { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    address: "",
    gstin: "",
    email: "",
    contact_number: "",
  });

  useEffect(() => {
    editHandler();
  }, []);

  const handleChange = (e) => {
    const var_name = e.target.name;
    setValues({ ...values, [var_name]: e.target.value });
  };

  const handlerChange2 = (e) => {
    const var_name = e.target.name;
    if (isNaN(e.target.value)) {
      return;
    }
    setValues({ ...values, [var_name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await contactServicices.updateContact(id, values);
      setMessage("Contact updated successfully.");
    } catch (error) {
      setError("Failed to update contact.");
    }
  };

  const editHandler = async () => {
    setError("");
    setLoading(false);
    setMessage("");
    try {
      const contactDoc = await contactServicices.getContact(id);
      setValues({
        name: contactDoc.data().name,
        address: contactDoc.data().address,
        gstin: contactDoc.data().gstin,
        email: contactDoc.data().email,
        contact_number: contactDoc.data().contact_number,
      });
    } catch (error) {
      setError(`Failed ${error}`);
    }
  };

  return (
    <>
    <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Edit Contact</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                value={values.name}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
            <Form.Group id="address" className="mt-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                value={values.address}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
            <Form.Group id="gst" className="mt-2">
              <Form.Label>GST</Form.Label>
              <Form.Control
                name="gstin"
                type="text"
                value={values.gstin.toUpperCase()}
                maxLength={15}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
            <Form.Group id="email" className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
            <Form.Group id="contact_number" className="mt-2">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                name="contact_number"
                type="text"
                value={values.contact_number}
                maxLength={10}
                onChange={(e) => handlerChange2(e)}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="d-flex align-items-center justify-content-center">
        <Button
          className="w-50 mt-4"
          variant="dark"
          onClick={() => navigate("/contact-list")}
        >
          Back To Home
        </Button>
      </div>
      </div>
      </Container>
    </>
  );
}
