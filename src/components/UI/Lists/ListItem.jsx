import React, { useContext } from "react";
import ChatContext from "../../../store/ChatContext";
import Text from "../Typography/Text";
import { StyledCard } from "./ListItem.style";
import { StyledAvatar } from "../Users/Avatars";
import user from "../../../assets/images/user.png";

const ListItem = ({ item, addMember, chatHandler }) => {
  const chatCtx = useContext(ChatContext);

  const clickHandler = (e) => {
    const data = {
      _id: item._id,
      name: item.name,
      avatar: item.avatar,
    };
    if (addMember) addMember(data);

    if (chatHandler) {
      chatCtx.changeContact(item);
    }
  };

  return (
    <div style={{ perspective: "760px" }}>
      <StyledCard onClick={clickHandler}>
        {item.avatar ? (
          <StyledAvatar src={item.avatar} alt={item.name} />
        ) : (
          <StyledAvatar src={user} alt={item.name} />
        )}
        <div className="text-wrapper">
          <Text
            fontSize={"1.2rem"}
            fontWeight={300}
            component={"h6"}
            variant={"h6"}
          >
            {item.name}
          </Text>
          <Text
            fontSize={"1.2rem"}
            fontWeight={200}
            component={"h6"}
            variant={"subtitle1"}
          >
            {item.phone}
          </Text>
        </div>
      </StyledCard>
    </div>
  );
};

export default ListItem;
