import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAddUser } from "../../hooks/useUser";
import Form from "../Forms/NewForm";

const GroupDetails = () => {
  const location = useLocation();
  const { mutate } = useAddUser();

  const { groupMembers } = location.state;

  const formData = [
    {
      id: "groupName",
      name: "groupName",
      type: "text",
      placeHolder: "Your group name",
    },
    {
      id: "groupDescriptiom",
      name: "groupDescription",
      type: "text",
      placeHolder: "Add the description for your group ",
    },
    {
      id: "groupIcon",
      name: "groupIcon",
      type: "file",
      placeHolder: "Your group image",
    },
  ];

  const [groupData, setGroupData] = useState({});

  const addDataHandler = (id, value) => {
    setGroupData((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  };

  const submitHandler = () => {
    console.log(groupData);
    console.log(groupMembers);

    const group = {
      ...groupData,
      members: groupMembers,
    };
    mutate({ group });
  };

  return (
    <div>
      <Form
        formData={formData}
        buttonText="Create Group"
        updateValue={addDataHandler}
        submitDataHandler={submitHandler}
      />
    </div>
  );
};

export default GroupDetails;
