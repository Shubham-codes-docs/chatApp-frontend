import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import ChatContext from "../../../store/ChatContext";
import SocketContext from "../../../store/SocketContext";
import InputField from "../../../components/inputField/InputField";
import Messages from "../../../components/messages/Messages";
import { InputWrapper, OuterWrapper } from "./ContactChatStyle";

const ContactChat = () => {
  const chatCtx = useContext(ChatContext);
  const socketCtx = useContext(SocketContext);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socketCtx.socket.emit("get-private-messages");
    socketCtx.socket.on("get-private-messages", ({ messages }) => {
      let Allmessages = messages
        ? messages.map((msg) => {
            return {
              id: msg._id,
              content: msg.content,
              sentTime: msg.sentAt,
              from: msg.from,
              to: msg.to,
              sent:
                msg.from === JSON.parse(localStorage.getItem("user"))
                  ? true
                  : false,
              receivedTime: msg.sentAt,
              createdAt: msg.createdAt,
              messageStatus: msg.messageStatus,
            };
          })
        : [];
      setMessages(Allmessages);

      return () => {
        setMessages([]);
        socketCtx.socket.off("get-private-messages");
        socketCtx.socket.off("handleStatusChange");
      };
    });
  }, []);

  useEffect(() => {
    socketCtx.socket.emit("handleStatusChange", {
      id: chatCtx.contact._id,
      message: "read",
    });
  }, [chatCtx.contact]);

  const changeMsgHandler = async (e) => {
    e.preventDefault();
    let message = {
      content: e.target.message.value,
      sentTime: moment().format("LT"),
      sent: true,
      to: chatCtx.contact._id,
      createdAt: new Date(),
      messageStatus: "sending",
    };

    setMessages((prevState) => [...prevState, message]);
    let user = await JSON.parse(localStorage.getItem("user"));

    socketCtx.socket.emit("private-message", {
      ...message,
      from: user,
    });

    e.target.message.value = "";
  };

  socketCtx.socket
    .off("handleMessageStatus")
    .on("handleMessageStatus", ({ id, messageStatus, to }) => {
      console.log(messageStatus);
      let changedMessages = [];
      changedMessages = messages.map((msg) => {
        if (to === msg.to) {
          msg._id = !msg._id ? id : msg._id;
          msg.messageStatus =
            // msg.messageStatus === "sending"
            //   ? messageStatus
            //   : msg.messageStatus === "sent"
            //   ? messageStatus
            //   : messageStatus === "delivered" &&
            //     msg.messageStatus !== "delivered"
            //   ? messageStatus
            //   : msg.messageStatus;

            messageStatus === "read" && msg.messageStatus !== "read"
              ? messageStatus
              : messageStatus === "delivered" &&
                msg.messageStatus !== "delivered" &&
                msg.messageStatus !== "read"
              ? messageStatus
              : msg.messageStatus === "sending" && messageStatus !== "read"
              ? messageStatus
              : msg.messageStatus;
        }
        return msg;
      });
      setMessages(changedMessages);
    });

  socketCtx.socket
    .off("private-message")
    .on("private-message", ({ content, from, sentTime, messageStatus }) => {
      let status = messageStatus;
      if (from === chatCtx.contact._id) {
        status = "read";
        socketCtx.socket.emit("handleStatusChange", {
          id: chatCtx.contact._id,
          message: "read",
        });
      }
      let message = {
        content,
        receivedTime: sentTime,
        from,
        createdAt: new Date(),
        messageStatus: status,
      };
      setMessages((prevState) => [...prevState, message]);
    });

  console.log(messages);

  return chatCtx.contact.name ? (
    <>
      <form onSubmit={changeMsgHandler}>
        <OuterWrapper>
          <Messages messages={messages} />
          <InputWrapper>
            <InputField />
          </InputWrapper>
        </OuterWrapper>
      </form>
    </>
  ) : (
    <p>ChatApp</p>
  );
};

export default ContactChat;
