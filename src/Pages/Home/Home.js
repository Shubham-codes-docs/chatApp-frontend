import React from "react";
import Grid from "@mui/material/Grid";
import ContactChat from "../Users/ContactChat/ContactChat";
import ChatProvider from "../../store/ChatProvider";
import { useGetUsers } from "../../hooks/useGetUsers";
import Loading from "../../components/Loading/Loding";
import ListContainer from "../../components/UI/Lists/ListContainer";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  const { data, isLoading, isError, error } = useGetUsers();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    <h1>{error}</h1>;
  }

  return (
    <ChatProvider>
      <Grid container>
        <Grid item xs={4}>
          <Navbar />
          {data && (
            <ListContainer items={data?.data?.users} chatHandler={true} />
          )}
        </Grid>
        <Grid item xs={8}>
          <ContactChat />
        </Grid>
      </Grid>
    </ChatProvider>
  );
};

export default Home;
