import React, { useContext } from "react";
import SocketContext from "../../../store/SocketContext";

const Options = () => {
  const socketCtx = useContext(SocketContext);

  const { callAccepted, callEnded, leaveCall } = socketCtx;

  return (
    <div>
      {callAccepted && !callEnded && (
        <button onClick={leaveCall}>End Call</button>
      )}
    </div>
  );
};

export default Options;
