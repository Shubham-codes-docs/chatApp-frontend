import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import { Typography } from "@mui/material";
import {
  AccessTimeSharp,
  DoneOutlined,
  DoneAllOutlined,
} from "@mui/icons-material";
import { MessageBox } from "./messagesStyled";
import ChatContext from "../../store/ChatContext";
import MessageTime from "./MessageTimeLogic";

const Messages = ({ messages }) => {
  const chatCtx = useContext(ChatContext);

  return (
    <>
      {messages.map((message, index, array) => {
        let nextMessageDate = array[index - 1]
          ? +new Date(array[index - 1].createdAt)
          : null;
        if (
          message.to === chatCtx.contact._id ||
          message.from === chatCtx.contact._id
        ) {
          return (
            <React.Fragment key={`${message.content}-${uuid()}`}>
              <MessageTime
                message={message}
                nextMessageDate={nextMessageDate}
              />
              <MessageBox
                sent={message.sent}
                manageBorders={
                  array[index - 1]
                    ? !array[index - 1].sent && message.sent
                      ? true
                      : false
                    : true
                }
                manageRecepientBorders={
                  array[index - 1]
                    ? array[index - 1].sent && !message.sent
                      ? true
                      : false
                    : true
                }
              >
                <Typography variant="body1" sx={{ maxHeight: "fit-content" }}>
                  {message.content}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    padding: "0 5px",
                    alignItems: "center",
                  }}
                >
                  {message.sent ? message.sentTime : message.receivedTime}
                  {message.sent && message.messageStatus === "sending" ? (
                    <AccessTimeSharp />
                  ) : message.sent && message.messageStatus === "sent" ? (
                    <DoneOutlined />
                  ) : message.sent && message.messageStatus === "delivered" ? (
                    <DoneAllOutlined />
                  ) : message.sent && message.messageStatus === "read" ? (
                    <DoneAllOutlined sx={{ color: "blue" }} />
                  ) : null}
                </Typography>
              </MessageBox>
            </React.Fragment>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default Messages;
