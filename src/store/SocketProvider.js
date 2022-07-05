import React, { useEffect, useState } from "react";
import SocketContext from "./SocketContext";
import io from "socket.io-client";

const SocketProvider = (props) => {
  let connection = io("http://localhost:5000", { autoConnect: false });
  const [socket, SetSocket] = useState(connection);

  const connectSocket = async () => {
    socket.userId = await JSON.parse(localStorage.getItem("user"));
    socket.connect();
  };

  useEffect(() => {
    const handleDisconnect = async () => {
      console.log(socket);
      if (socket.disconnected) {
        socket.auth = {
          sessionId: window.sessionStorage.getItem("sessionId"),
          userId: JSON.parse(localStorage.getItem("user")),
        };
        socket.userId = await JSON.parse(localStorage.getItem("user"));
        socket.connect();
      }
    };
    handleDisconnect();
  }, [socket]);

  useEffect(() => {
    const handleCreds = async () => {
      socket.on("session", async (data) => {
        if (window.sessionStorage.getItem("sessionId")) {
          socket.auth = {
            ...socket.auth,
            sessionId: window.sessionStorage.getItem("sessionId"),
          };
          socket.userId = await JSON.parse(localStorage.getItem("user"));
        } else {
          window.sessionStorage.setItem("sessionId", data.sessionId);
          socket.auth = { ...socket.auth, sessionId: data.sessionId };
          socket.userId = await JSON.parse(localStorage.getItem("user"));
          console.log("Running setting of session Id");
        }
      });
    };

    handleCreds();
  }, [socket]);

  const socketContext = {
    socket,
    connectSocket,
  };

  return (
    <SocketContext.Provider value={socketContext}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
