import styled from 'styled-components';
import { H1 } from '../src/components/Tyopgrahy';
import { typeScale } from '../theme/typography';

import spacing from '../theme/spacing';

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

export const GameTitleContainer = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    align-self: flex-end;
    margin-top: ${spacing[9]};
  }
`;

export const GameTitleRating = styled.p``;

export const GameTitle = styled(H1)``;

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

export const SubHeading = styled.h2`
  font-size: ${typeScale.header3};
  padding-bottom: ${spacing[5]};
  border-bottom: 1px solid ${({ theme }) => theme.dividerColor};
  margin-bottom: ${spacing[5]};
`;
