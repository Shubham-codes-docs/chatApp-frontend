import styled from "styled-components";

export const MessageBox = styled.div`
  padding: 5px;
  height: fit-content;
  width: 40%;
  border-radius: 10px;
  background-color: ${(props) => (!props.sent ? "#fff" : "#D1F4CC")};
  color: #000;
  margin: 10px 5px;
  align-self: ${(props) => (props.sent ? "flex-end" : "flex-start")};
  border-top-right-radius: ${(props) => (props.sent && props.manageBorders ? "2px" : "10px")};
  border-top-left-radius: ${(props) => (!props.sent && props.manageRecepientBorders ? "2px" : "10px")};
`;
