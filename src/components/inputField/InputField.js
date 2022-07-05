import React from "react";
import TextField from "@mui/material/TextField";
import { TextFieldWrapper, ButtonWrapper } from "./InputFieldStyled";
import Buttons from "./Buttons";

const InputField = () => {
  return (
    <>
      <TextFieldWrapper>
        <TextField
          multiline
          minRows={1}
          placeholder="Enter Message"
          sx={{
            width: "100%",
            borderRadius: "50px",
            color: "#fff",
            backgroundColor: "whitesmoke",
          }}
          name="message"
        />
      </TextFieldWrapper>
      <ButtonWrapper>
        <Buttons />
      </ButtonWrapper>
    </>
  );
};

export default InputField;
