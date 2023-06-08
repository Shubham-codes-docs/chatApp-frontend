import React from "react";
import { Typography } from "@mui/material";

const Headings = ({ fontSize, fontWeight, variant, component, children }) => {
  return (
    <Typography
      component={component}
      variant={variant}
      sx={{ fontSize, fontWeight }}
    >
      {children}
    </Typography>
  );
};

export const Heading = ({ children }) => {
  return (
    <Typography component="h4" sx={{ fontSize: "2.4rem", fontWeight: "600" }}>
      {children}
    </Typography>
  );
};

export default Headings;
