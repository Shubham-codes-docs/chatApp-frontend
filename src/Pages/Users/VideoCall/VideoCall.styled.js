import styled from "styled-components";

export const VideoCallContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 0.5rem;
`;

export const VideoItem = styled.video`
  background-color: #000;
  width: 100%;
`;
