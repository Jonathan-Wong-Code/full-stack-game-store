import styled from 'styled-components';
import { breakpoints } from '../../../theme/breakpoints';
export const CarouselContainer = styled.section`
  position: relative;
  height: 600px;
  width: 100vw;

  @media screen and (min-width: ${breakpoints[0]}px) {
    width: 70vw;
    margin: 0 auto;
  }
`;

// Where the sliding happens due to translate
export const CarouselContent = styled.div`
  transform: translateX(-${({ translate }) => translate}px);
  transition: transform ease-out ${({ transition }) => transition}s;

  height: 100%;
  width: ${({ width }) => `${width}px`};

  display: flex;
`;
