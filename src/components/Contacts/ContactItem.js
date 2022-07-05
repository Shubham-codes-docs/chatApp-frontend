import React, { useContext } from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatContext from "../../store/ChatContext";

const ContactItem = ({ contact }) => {
  const chatCtx = useContext(ChatContext);

  const chatHandler = () => {
    chatCtx.changeContact(contact);
  };

  return (
    <div className="contact-cards" onClick={chatHandler}>
      <Card
        variant="outlined"
        sx={{ display: "flex", margin: "1rem", padding: "10px" }}
      >
        <Avatar
          src={contact.avatar}
          alt={contact.name}
          sx={{ marginRight: "0.5rem", width: 56, height: 56 }}
        />
        <Typography variant="h6">{contact.name}</Typography>
      </Card>
    </div>
  );
};

export default ContactItem;
