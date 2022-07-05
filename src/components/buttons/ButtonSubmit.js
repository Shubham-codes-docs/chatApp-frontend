import React from "react";
import Button from "@mui/material/Button";
const ButtonSubmit = ({text}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "5px",
      }}
    >
      <Button variant="outlined" type="submit">
        {text}
      </Button>
    </div>
  );
};

export default ButtonSubmit;
