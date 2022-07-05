import React from "react";
import moment from "moment";
import { Paper } from "@mui/material";

const MessageTimeLogic = ({ message, nextMessageDate }) => {
  return (
    <>
      {moment(message.createdAt).format("MMM DD YYYY") !==
        moment(nextMessageDate).format("MMM DD YYYY") &&
      moment(message.createdAt).format("MMM DD YYYY") !==
        moment().format("MMM DD YYYY") &&
      moment(message.createdAt).format("MMM DD YYYY") !==
        moment(new Date(new Date() - 24 * 60 * 60 * 1000)).format(
          "MMM DD YYYY"
        ) ? (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "gray",
            alignSelf: "center",
            color: "#fff",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {moment(message.createdAt).format("MMM DD YYYY")}
        </Paper>
      ) : null}
      {moment(message.createdAt).format("MMM DD YYYY") !==
        moment(nextMessageDate).format("MMM DD YYYY") &&
      moment(message.createdAt).format("MMM DD YYYY") ===
        moment().format("MMM DD YYYY") ? (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "gray",
            alignSelf: "center",
            color: "#fff",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          Today
        </Paper>
      ) : null}
      {moment(message.createdAt).format("MMM DD YYYY") !==
        moment(nextMessageDate).format("MMM DD YYYY") &&
      moment(message.createdAt).format("MMM DD YYYY") ===
        moment(new Date(new Date() - 24 * 60 * 60 * 1000)).format(
          "MMM DD YYYY"
        ) ? (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "gray",
            alignSelf: "center",
            color: "#fff",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          Yesterday
        </Paper>
      ) : null}
    </>
  );
};

export default MessageTimeLogic;
