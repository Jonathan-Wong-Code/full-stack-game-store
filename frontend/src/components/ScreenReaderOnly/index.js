import styled from "styled-components";
import { hideVisually } from "polished";
const ScreenReaderOnly = styled.span`
  ${hideVisually()};
`;

export default ScreenReaderOnly;
