import React from "react";
import { Container, Grid } from "@mui/material";
import { Heading } from "../UI/Typography/Text";
import Inputs from "./inputs/Inputs";
import { padding } from "../../themes/ClassGenerator";
import ButtonSubmit from "../buttons/ButtonSubmit";

const NewForm = ({
  title,
  formData,
  buttonText,
  submitDataHandler,
  updateValue,
}) => {
  const valueUpdateHandler = (id, value) => {
    updateValue(id, value);
  };

  const submHandler = (e) => {
    e.preventDefault();
    submitDataHandler();
  };

  return (
    <form onSubmit={submHandler}>
      <Heading>{title}</Heading>
      <Container maxWidth="lg" className={padding("30px 30px").root}>
        <Grid
          container
          spacing={2}
          sx={{
            margin: "auto",
          }}
        >
          {formData.map((data) => {
            return (
              <Grid item xs={8} md={6} key={data.id}>
                <Inputs
                  type={data.type}
                  id={data.id}
                  name={data.name}
                  placeHolder={data.placeHolder}
                  label={data.label}
                  key={data.id}
                  updateValue={valueUpdateHandler}
                />
              </Grid>
            );
          })}
        </Grid>
        <ButtonSubmit text={buttonText} />
      </Container>
    </form>
  );
};

export default NewForm;
