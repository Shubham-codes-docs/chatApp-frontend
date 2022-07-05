import React, { useState } from "react";
import ChatContext from "./ChatContext";

const ChatProvider = (props) => {
  const [contact, setContact] = useState({});

  const contactChangeHandler = (value,id) => {
    setContact(value);
  };

  const chatContext = {
    contact,
    changeContact: contactChangeHandler,
  };

  return (
    <ChatContext.Provider value={chatContext}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
