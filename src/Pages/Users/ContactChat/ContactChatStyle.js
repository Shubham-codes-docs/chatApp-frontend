import styled from "styled-components";
import background from "../../../assets/images/background.webp";

export const InputWrapper = styled.div`
  display: flex;
  `;

export const OuterWrapper = styled.div`
border: 2px solid black;
  background: url(${background}) center center no-repeat;
  background-size: cover;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`