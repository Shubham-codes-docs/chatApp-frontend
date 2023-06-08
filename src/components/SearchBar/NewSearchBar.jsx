import React, { useState } from "react";
import { Input } from "./searchbar.styled";

const NewSearchBar = ({ users, setFilteredUsers }) => {
  const [query, setQuery] = useState("");

  const onChangeHandler = (e) => {
    setQuery(e.target.value);
    console.log("change");
    const filteredUsers = users.filter((user) => {
      if (e.target.value === "") return users;
      else if (
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.phone.includes(e.target.value)
      )
        return user;
    });
    setFilteredUsers(filteredUsers);
  };

  return (
    <Input
      type="text"
      placeholder="Search Contacts"
      onChange={onChangeHandler}
    />
  );
};

export default NewSearchBar;
