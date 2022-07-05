import React, { useState, useEffect, useContext } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AuthContext from "../../store/AuthContext";

const SearchBar = ({ addUserHandler }) => {
  const [users, setUsers] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getUsers() {
      const res = await fetch("http://localhost:5000/api/auth/get-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${authCtx.token}`,
        },
      });
      const data = await res.json();
      setUsers(data.users);
    }
    getUsers();
  }, [authCtx.token]);

  const changeHandler = (e, value) => {
    addUserHandler(value);
  };

  return (
    <Autocomplete
      disablePortal
      id="contact-list"
      options={users}
      getOptionLabel={(option) => `${option.name}-${option.phone}`}
      sx={{ width: "100%", margin: "auto" }}
      renderInput={(params) => <TextField {...params} label="Find Contacts" />}
      onChange={changeHandler}
    />
  );
};

export default SearchBar;
