import React from "react";
import { TextField, FormGroup } from "@mui/material";

const Inputs = ({ type, id, name, placeHolder, label, updateValue }) => {
  const onChangeHandler = (e) => {
    updateValue(e.target.id, e.target.value);
  };

  return (
    <FormGroup>
      <label htmlFor={id}>{label}</label>
      <TextField
        type={type}
        id={id}
        name={name}
        placeholder={placeHolder}
        onChange={onChangeHandler}
      />
    </FormGroup>
  );
};

export default Inputs;
