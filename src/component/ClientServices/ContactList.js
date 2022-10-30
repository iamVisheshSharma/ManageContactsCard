import React, { useEffect, useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import contactServicices from "../services/contact.servicices";
import CardView from "./CardView";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
export default function ContactList(props) {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const data = await contactServicices.getAllContacts(currentUser.uid);
    setContacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (contact_id) => {
    await contactServicices.deleteContact(contact_id);
    getContacts();
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    if (search !== "") {
      const newContactResult = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResult(newContactResult);
    } else {
      setSearchResult(contacts);
    }
  };

  return (
    <>
      <Container
        className="d-flex  justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100 mt-4 mb-4">
          <Card className="bg-info">
            <Card.Body>
              <h1 className="text-center">Contact Manager</h1>
            </Card.Body>
          </Card>
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h2 className="text-warning">Contact List</h2>
            <div>
              <Button onClick={() => navigate("/new-contact")}>
                Add Contact
              </Button>
              <Button
                variant="success"
                className="m-2"
                onClick={() => navigate("/profile")}
              >
                Profile
              </Button>
            </div>
          </div>
          <input
            type="search"
            placeholder="Search"
            className="w-100 mt-1 rounded p-2"
            value={search}
            onChange={(e) => searchHandler(e)}
            aria-label="Search"
          />
          <CardView
            contacts={search.length < 1 ? contacts : searchResult}
            deleteHandler={deleteHandler}
            key={uuidv4()}
          />
        </div>
      </Container>
    </>
  );
}
