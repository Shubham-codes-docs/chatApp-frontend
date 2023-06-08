import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Container, Avatar } from "@mui/material";
import { VideoCall, Call } from "@mui/icons-material";
import Text from "../UI/Typography/Text";
import SocketContext from "../../store/SocketContext";
import { NavbarWrapper, IconsWrapper, InfoWrapper } from "./UserNavbar.styled";

const UserNavbar = ({ contact }) => {
  const socketCtx = useContext(SocketContext);

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <NavbarWrapper>
            <InfoWrapper>
              <Avatar src={contact?.image || ""} alt={contact.name} />
              <Text
                fontSize="1.4rem"
                fontWeight={400}
                component={"h6"}
                variant={"h6"}
              >
                {contact.name}
              </Text>
            </InfoWrapper>
            <IconsWrapper>
              <button
                onClick={() => {
                  socketCtx.makeCall(contact._id);
                }}
                style={{
                  textDecoration: "none",
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                <Link
                  to={`/video-call/${contact._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <VideoCall sx={{ cursor: "pointer" }} fontSize="large" />
                </Link>
              </button>
              <Call sx={{ cursor: "pointer" }} fontSize="large" />
            </IconsWrapper>
          </NavbarWrapper>
        </Container>
      </AppBar>
    </div>
  );
};

export default UserNavbar;
