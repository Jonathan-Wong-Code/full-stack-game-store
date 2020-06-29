import styled from 'styled-components';

export const CarouselContainer = styled.section`
  position: relative;
  height: 500px;
  width: 70vw;

  margin: 0 auto;
  // overflow: hidden;
`;

export const CarouselContent = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: all ease-out ${props => props.transition}s;
  height: 100%;
  display: flex;
  width: ${({ width }) => `${width}px`};
`;
