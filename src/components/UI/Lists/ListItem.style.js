import styled from "styled-components";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)`
  padding: 0.8rem 2.5rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  box-shadow: none;
  cursor: pointer;
  perspective: 250px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translate3d(10px, 0, 20px);
  }
`;
