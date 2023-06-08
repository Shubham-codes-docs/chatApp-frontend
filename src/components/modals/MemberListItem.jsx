import React from "react";
import { ItemWrapper } from "./memberListItem.styled";
import { StyledAvatar } from "../UI/Users/Avatars";
import user from "../../assets/images/user.png";

const MemberListItem = ({ member }) => {
  return (
    <ItemWrapper>
      {member !== undefined && <StyledAvatar src={member?.avatar || user} />}
      <span>{member?.name}</span>
    </ItemWrapper>
  );
};

export default MemberListItem;
