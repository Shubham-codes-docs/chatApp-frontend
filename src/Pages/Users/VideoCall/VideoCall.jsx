import React, { useRef, useEffect, useContext } from "react";
import { VideoCallContainer, VideoItem } from "./VideoCall.styled";
import SocketContext from "../../../store/SocketContext";
import Options from "./Options";

const VideoCall = () => {
  const socketCtx = useContext(SocketContext);

  const {
    stream,
    updateUserRef,
    callAccepted,
    userVideoRef,
    callEnded,
    contactVideoRef,
    connectionRef,
  } = socketCtx;

  return (
    <>
      <VideoCallContainer>
        {console.log(callAccepted)}
        {stream && (
          <VideoItem
            autoPlay
            playsInline
            muted
            id="user-self"
            ref={userVideoRef}
          />
        )}
        {callAccepted && !callEnded && (
          <VideoItem
            autoPlay
            playsInline
            muted
            id="contact"
            ref={contactVideoRef}
          />
        )}
      </VideoCallContainer>
      <Options />
    </>
  );
};

export default VideoCall;
