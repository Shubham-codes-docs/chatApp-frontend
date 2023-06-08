import { createContext } from "react";

const SocketContext = createContext({
  socket: null,
  connectSocket: () => {},
  stream: null,
  addStream: (stream) => {},
  call: null,
  updateCall: ({ signal, from, type, to }) => {},
  answerCall: () => {},
  makeCall: (contact) => {},
  leaveCall: () => {},
  updateUserRef: (userVideoRef) => {},
  callAccepted: false,
  callEnded: false,
  userVideoRef: null,
  contactVideoRef: null,
  connectionRef: null,
});

export default SocketContext;
