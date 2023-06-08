import React from "react";
import { Container } from "@mui/material";
import ListItem from "./ListItem";

const ListContainer = ({ items, addGroupMember, chatHandler }) => {
  const addMember = (value) => {
    if (addGroupMember) {
      addGroupMember(value);
    }
  };

  return (
    <Container>
      {items.map((item) => {
        return (
          <ListItem
            key={item._id}
            item={item}
            addMember={addMember}
            chatHandler={chatHandler}
          />
        );
      })}
    </Container>
  );
};

export default ListContainer;
