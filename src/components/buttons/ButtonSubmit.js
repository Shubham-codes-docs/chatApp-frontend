import React from "react";
import Button from "@mui/material/Button";
const ButtonSubmit = ({ text, clickHandler, children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "5px",
      }}
    >
      <Button
        variant="outlined"
        type="submit"
        onClick={clickHandler && clickHandler}
      >
        {text}
        {children && children}
      </Button>
    </div>
  );
};

export default ButtonSubmit;
