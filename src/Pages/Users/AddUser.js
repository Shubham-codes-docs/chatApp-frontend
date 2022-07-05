import React, { useContext } from "react";
import Container from "@mui/material/Container";
import SearchBar from "../../components/SearchBar/SearchBar";
import AuthContext from "../../store/AuthContext";

const AddUser = () => {
  const authCtx = useContext(AuthContext);

  const addUser = async (value) => {
    const res = await fetch("http://localhost:5000/api/auth/add-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${authCtx.token}`,
      },
      body: JSON.stringify({ contact: value }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <SearchBar addUserHandler={addUser} />
    </Container>
  );
};

export default AddUser;
