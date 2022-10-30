import React from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function CardView({contacts, deleteHandler}) {
  const navigate = useNavigate();

  return (
    <Row>
      {contacts.length > 0 ? (
        contacts.map((contact, index) => {
          return (
            <div className="col-xs-12 col-sm-6 col-md-4" key={uuidv4()}>
              <Card key={index} className="text-center mt-2 bg-light">
                <Card.Body>
                  <Card.Title>{contact.name}</Card.Title>
                  <Card.Text style={{fontWeight: "500"}}>{contact.address}</Card.Text>
                  <Card.Text style={{fontWeight: "500"}}>{contact.contact_number}</Card.Text>
                  <Card.Text style={{fontWeight: "500"}}>{contact.email}</Card.Text>
                  <Card.Title>{contact.gstin.toUpperCase()}</Card.Title>
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(contact.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="m-2"
                    variant="primary"
                    onClick={() => navigate(`/edit-contact/${contact.id}`)}
                  >
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })
      ) : (
        <h2>No contacts available.</h2>
      )}
    </Row>
  );
}
