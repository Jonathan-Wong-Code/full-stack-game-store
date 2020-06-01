import styled from "styled-components";

export const Button = styled.button`
  border-radius: 5px;

  background-color: ${({ theme, primaryIcon }) =>
    primaryIcon ? theme.primaryLight : theme.secondaryLight};

  transition: 0.2s all;

  &:hover {
    background-color: ${({ theme, primaryIcon }) =>
      primaryIcon ? theme.primaryColor : theme.secondaryColor};
  }
`;
