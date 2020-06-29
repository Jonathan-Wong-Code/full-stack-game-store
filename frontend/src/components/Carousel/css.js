import styled from 'styled-components';
import { breakpoints } from '../../../theme/breakpoints';
export const CarouselContainer = styled.section`
  position: relative;
  height: 470px;
  width: 100vw;

  @media screen and (min-width: ${breakpoints[1]}px) {
    width: 70vw;
    margin: 0 auto;
  }
`;

export const CarouselContent = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out ${props => props.transition}s;
  height: 100%;
  display: flex;
  width: ${({ width }) => `${width}px`};
`;
