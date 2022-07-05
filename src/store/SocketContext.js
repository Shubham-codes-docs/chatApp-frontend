import { createContext } from "react";

const SocketContext = createContext({
  socket: null,
  connectSocket:()=>{}
});

export default SocketContext;
