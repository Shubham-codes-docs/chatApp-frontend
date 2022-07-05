import React from "react";

const ChatContext = React.createContext({
  contact: {},
  changeContact: () => {},
});

export default ChatContext;
