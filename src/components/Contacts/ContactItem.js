import React, { useContext, useEffect, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import { StyledAvatar } from "../UI/Users/Avatars";
import Typography from "@mui/material/Typography";
import ChatContext from "../../store/ChatContext";
import SocketContext from "../../store/SocketContext";

const ContactItem = ({ contact }) => {
  const chatCtx = useContext(ChatContext);
  const socketCtx = useContext(SocketContext);
  const [lastMessage, setLastMessage] = useState("");

  const getLatestMessage = useCallback(async () => {
    socketCtx.socket.emit("get-private-message");
    socketCtx.socket.on("get-private-message", ({ messages }) => {
      setLastMessage(messages[0]);
    });
  }, [socketCtx]);

  useEffect(() => {
    getLatestMessage();
  }, [getLatestMessage]);

  const chatHandler = () => {
    chatCtx.changeContact(contact);
  };

  return (
    <div className="contact-cards" onClick={chatHandler}>
      <Card
        variant="outlined"
        sx={{ display: "flex", margin: "1rem", padding: "10px" }}
      >
        <StyledAvatar
          src={contact.avatar}
          alt={contact.name}
          sx={{ marginRight: "0.5rem", width: 56, height: 56 }}
        />
        <Typography variant="h6">{contact.name}</Typography>
        <Typography variant="subtitle1">{lastMessage.content}</Typography>
      </Card>
    </div>
  );
};

export default ContactItem;
