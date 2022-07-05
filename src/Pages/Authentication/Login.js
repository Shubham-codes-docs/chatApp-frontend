import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import SocketContext from "../../store/SocketContext";
import AuthContext from "../../store/AuthContext";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { padding } from "../../themes/ClassGenerator";
import ButtonSubmit from "../../components/buttons/ButtonSubmit";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const socketCtx = useContext(SocketContext);
  const history = useHistory();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        password,
      }),
    });
    let data = await res.json();
    if (data.token) {
      const expirationTime = new Date(new Date().getTime() + 10 * 1000 * 3600);
      authCtx.tokenChangeHandler(data.token, expirationTime);
      authCtx.userChangeHandler(data.id);
      socketCtx.socket.auth = { userId: data.id };
      socketCtx.connectSocket();
      socketCtx.socket.emit("handleStatusChange",{id:data.id,message:"delivered"});
      history.replace("/");
    }
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
          <Grid item xs={12} md={12}>
            <FormGroup>
              <label htmlFor="phone">Phone</label>
              <TextField
                placeholder="Enter your number"
                name="phone"
                id="phone"
                autoComplete="off"
                variant="standard"
                color="success"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={12}>
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
        </Grid>
        <ButtonSubmit text="Log In" />
      </Container>
    </form>
  );
};

export default Login;
