import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Container } from "@mui/material";
import { useGetUsers } from "../../hooks/useGetUsers";
import { StyledBox } from "./AddMembers.styled";
import Headings from "../UI/Typography/Text";
import ListContainer from "../UI/Lists/ListContainer";
import Loading from "../Loading/Loding";
import SearchBar from "../SearchBar/NewSearchBar";
import MemberListContainer from "./MemberListContainer";
import Button from "../buttons/ButtonSubmit";

const AddMembers = ({ isOpen, closeModal }) => {
  const { data, isLoading, isError, error } = useGetUsers();
  console.log(data);

  const [users, setUsers] = useState(data?.data?.users);
  const [open, setOpen] = useState(false);
  const [groupMembers, setGroupMembers] = useState(new Map());
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    closeModal(false);
    setGroupMembers(new Map());
  };

  useEffect(() => {
    setUsers(data?.data?.users);
  }, [data]);

  useEffect(() => {
    if (isOpen) handleOpen();
  }, [isOpen]);

  const filterUserHandler = (users) => {
    setUsers(users);
  };

  const addGroupMember = (value) => {
    setGroupMembers(new Map(groupMembers.set(value._id, value)));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    <h1>{error}</h1>;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <StyledBox>
          <Headings
            id="modal-modal-title"
            variant="h2"
            component="h4"
            fontSize={"2.5rem"}
            fontWeight={700}
          >
            Select Contacts for the group
          </Headings>
          <SearchBar
            users={data?.data?.users}
            setFilteredUsers={filterUserHandler}
          />
          <MemberListContainer members={Array.from(groupMembers.values())} />
          {groupMembers && groupMembers.size > 0 && (
            <Button>
              <Link
                to={{
                  pathname: "/group/details",
                  state: {
                    groupMembers: Array.from(groupMembers.keys()),
                  },
                }}
              >
                Proceed
              </Link>
            </Button>
          )}
          {users && users.length > 0 && (
            <>
              <ListContainer items={users} addGroupMember={addGroupMember} />
            </>
          )}
        </StyledBox>
      </Container>
    </Modal>
  );
};

export default AddMembers;
