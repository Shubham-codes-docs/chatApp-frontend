import React from "react";
import { Stack } from "@mui/material";
import MemberListItem from "./MemberListItem";

const MemberListContainer = ({ members }) => {
  return (
    <Stack direction="row">
      {members &&
        members.map((member) => {
          return <MemberListItem member={member} key={member._id} />;
        })}
    </Stack>
  );
};

export default MemberListContainer;
