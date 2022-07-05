import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { padding } from "../../themes/ClassGenerator";
import ButtonSubmit from "../buttons/ButtonSubmit";
const Forms = () => {
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.number.value;
    const password = e.target.password.value;
    const cpassword = e.target.cpassword.value;

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <form noValidate onSubmit={formSubmitHandler}>
      <Container maxWidth="lg" className={padding("30px 30px").root}>
        <Grid
          container
          spacing={2}
          sx={{
            margin: "auto",
          }}
          className={padding("10px 10px").root}
        >
          <Grid item xs={8} md={6}>
            <FormGroup>
              <label htmlFor="name">Name</label>
              <TextField
                placeholder="Enter your name"
                name="name"
                id="name"
                autoComplete="off"
                variant="standard"
                color="success"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={8} md={6}>
            <FormGroup>
              <label htmlFor="number">Phone Number</label>
              <TextField
                placeholder="Enter your number"
                name="number"
                id="number"
                variant="standard"
                inputProps={{
                  autoComplete: "Phone Number",
                }}
                color="success"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={8} md={6}>
            <FormGroup>
              <label htmlFor="password">Password</label>
              <TextField
                placeholder="Enter your password"
                name="password"
                id="password"
                type="password"
                variant="standard"
                inputProps={{
                  autoComplete: "Password",
                }}
                color="success"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={8} md={6}>
            <FormGroup>
              <label htmlFor="cpassword">Confirm Password</label>
              <TextField
                placeholder="Confirm your password"
                name="cpassword"
                id="cpassword"
                type="password"
                autoComplete="off"
                variant="standard"
                color="success"
              />
            </FormGroup>
          </Grid>
        </Grid>
        <ButtonSubmit text="SignIn" />
      </Container>
    </form>
  );
};

export default Forms;
