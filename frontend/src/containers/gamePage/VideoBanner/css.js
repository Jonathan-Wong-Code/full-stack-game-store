import styled from 'styled-components';
import { Wrapper } from '../../../components/Wrapper';

// IMG BANNER STYLES
export const GameBanner = styled.section`
  background-image: linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.2)), 
  url('${({ mobileImage }) => mobileImage}');
  background-size: cover;
  display: grid;
  background-position: center top;  
  height: 400px;


  @media screen and (min-width:${({ theme }) => theme.breakpoints[0]}px) {
    background-image: linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)), 
    url('${({ desktopImage }) => desktopImage}');

    height: 600px;
  }
`;

export const InnerBanner = styled(Wrapper)`
  display: grid;
  width: 100%;
  height: 100%;
`;

export const PlayButton = styled.button`
  height: 100px;
  width: 100px;

  border: 6px solid ${({ theme }) => theme.white};
  border-radius: 50%;

  display: flex;
  align-self: center;
  justify-self: center;

  grid-row: 1/1;
  grid-column: 1/1;

  &::after {
    margin: auto;
    content: '';
    height: 40px;
    width: 40px;
    display: block;
    background-color: ${({ theme }) => theme.white};
    clip-path: polygon(20% 0, 100% 50%, 100% 50%, 20% 100%);
  }
`;

export const GameCardContainer = styled.div`
  transform: translateY(0);

  z-index: 10;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    grid-row: 1/1;
    grid-column: 1/1;
    transform: translateY(50%);
    align-self: end;
    justify-self: end;
  }
`;
