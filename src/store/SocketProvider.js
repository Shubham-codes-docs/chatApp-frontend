import React, { useEffect, useState, useCallback, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import SocketContext from "./SocketContext";
import io from "socket.io-client";
import Peer from "simple-peer";

const SocketProvider = (props) => {
  let connection = io("http://localhost:5000", { autoConnect: false });
  const [socket, SetSocket] = useState(connection);
  const [stream, setStream] = useState(null);
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const userVideoRef = useRef();
  const contactVideoRef = useRef();
  const connectionRef = useRef();

  const connectSocket = async () => {
    socket.userId = await JSON.parse(localStorage.getItem("user"));
    socket.connect();
  };

  const history = useHistory();
  const location = useLocation();

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

  const handleCreds = useCallback(() => {
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
  }, [socket]);

  const updateCall = (signal, from, to) => {
    setCall({ isReceivingCall: true, from, signal, to });
  };

  const answerCall = () => {
    setCallAccepted(true);
    history.push(`/video-call/${call.from}`);

    console.log("stream", stream);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      contactVideoRef.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const makeCall = (contact) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        signalData: data,
        userToCall: contact,
        from: JSON.parse(localStorage.getItem("user")),
      });
    });

    peer.on("stream", (currentStream) => {
      userVideoRef.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      console.log("callAccepted", signal);
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  socket.off("test").on("test", () => {
    console.log("test in provider");
  });

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    history.push("/");
  };

  socket.on("callUser", ({ signal, from, to }) => {
    updateCall(signal, from, to);
  });

  useEffect(() => {
    handleCreds();
  }, [socket, handleCreds]);

  useEffect(() => {
    if (location.pathname.includes("video-call")) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          setStream(stream);
          if (userVideoRef.current) userVideoRef.current.srcObject = stream;
        });

      return () => {
        connectionRef.current.destroy();
        // userVideoRef.current.srcObject = null;
        // contactVideoRef.current.srcObject = null;
      };
    }
  }, []);

  const socketContext = {
    socket,
    connectSocket,
    stream,
    // addStream,
    call,
    updateCall,
    answerCall,
    makeCall,
    leaveCall,
    // updateUserRef,
    callAccepted,
    callEnded,
    userVideoRef,
    contactVideoRef,
    connectionRef,
  };

  return (
    <SocketContext.Provider value={socketContext}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
