import React, { useEffect, useState, useContext } from "react";
import Container from "@mui/material/Container";
import ContactItem from "./ContactItem";
import AuthContext from "../../store/AuthContext";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getContacts() {
      const res = await fetch(
        "http://localhost:5000/api/auth/get-userDetails",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${authCtx.token}`,
          },
        }
      );
      const data = await res.json();
      setContacts(data.user.contacts);
    }
    getContacts();
  }, [authCtx.token]);

  return (
    <Container maxWidth="sm" sx={{ margin: "2rem 1rem" }}>
      {contacts.map((contact) => {
        return <ContactItem contact={contact} key={contact._id} />;
      })}
    </Container>
  );
};

export default ContactList;
