import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Forms from "../../components/Forms/Forms";

const Register = () => {

  return (
    <Container sx={{marginTop:"20px"}}>
      <Typography variant="h3" color="primary" sx={{margin:"auto",width:"fit-content",textDecoration:"underline"}}>
        Sign-In
      </Typography>
      <Forms />
    </Container>
  );
};

export default Register;
