import styled from 'styled-components';
import { Wrapper } from '../src/components/Wrapper';
import { H1 } from '../src/components/Tyopgrahy';
import { typeScale } from '../theme/typography';

import spacing from '../theme/spacing';

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

export const GameTitleCardContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  border-bottom: 1px solid ${({ theme }) => theme.dividerColor};
  padding-bottom: ${spacing[5]};
  margin-bottom: ${spacing[7]};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    flex-direction: row;
  }
`;

export const GameCardContainer = styled.div`
  transform: translateY(50%);
  align-self: end;
  justify-self: end;
  grid-row: 1/1;
  grid-column: 1/1;
`;

export const GameTitleContainer = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    align-self: flex-end;
    margin-top: ${spacing[9]};
  }
`;

export const GameTitleRating = styled.p``;

export const GameTitle = styled(H1)``;

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

// IMG GALLERY STYLES

export const ImgGallery = styled.ul`
  display: flex;
  width: 70%;
  margin: 0;
  padding: 0;
`;

export const ImgContainer = styled.li`
  &:not(:last-child) {
    margin-right: ${spacing[3]};
  }
`;

export const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

// DESCRIPTION STYLES

export const DescriptionDetailsSection = styled.section`
  display: flex;
  padding: ${spacing[7]} 0;
`;

export const DescriptionContainer = styled.div`
  width: 70%;
  margin-right: ${spacing[7]};
  font-weight: 300;
`;

export const GameDetailsContainer = styled.div`
  width: 30%;
`;

export const SubHeading = styled.h2`
  font-size: ${typeScale.header3};
  padding-bottom: ${spacing[5]};
  border-bottom: 1px solid ${({ theme }) => theme.dividerColor};
  margin-bottom: ${spacing[5]};
`;

export const DetailList = styled.ul`
  width: 100%;
`;

export const Detail = styled.li`
  margin-bottom: ${spacing[2]};
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

// REVIEWS

export const ReviewContainer = styled.li`
  width: 100%;
`;

export const ReviewHeading = styled(SubHeading)`
  margin-bottom: 0;
`;

export const FilterBar = styled.div``;
