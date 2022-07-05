import React from "react";
import ContactList from "../../components/Contacts/ContactList";

import Grid from "@mui/material/Grid";
import ContactChat from "../Users/ContactChat/ContactChat";
import ChatProvider from "../../store/ChatProvider";

const Home = () => {
  return (
    <ChatProvider>
      <Grid container>
        <Grid item xs={4}>
          <ContactList />
        </Grid>
        <Grid item xs={8}>
          <ContactChat />
        </Grid>
      </Grid>
    </ChatProvider>
  );
};

export default Home;
