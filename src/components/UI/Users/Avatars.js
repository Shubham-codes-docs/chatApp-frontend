import styled from "styled-components";
import { Avatar } from "@mui/material";

export const StyledAvatar = styled(Avatar)`
  background-color: magenta;
  padding: 5px;
  margin-bottom: 20px;
  position: ${(props) => props.position || "static"};
  bottom: 50%;
  left: 50%;
`;
