import styled from 'styled-components';
import spacing from '../../../theme/spacing';
import { breakpoints } from '../../../theme/breakpoints';

export const ProfileContainer = styled.div`
  width: 100%;
  margin-bottom: ${spacing[5]};
  display: flex;
  align-items: center;

  @media screen and (min-width: ${breakpoints[0]}px) {
    width: 200px;
    margin: 0;
    flex-direction: column;
  }
`;

export const ImgContainer = styled.div`
  height: 60px;
  width: 60px;
  margin-right: ${spacing[3]};

  @media screen and (min-width: ${breakpoints[0]}px) {
    margin-right: 0;
    height: 80px;
    width: 80px;
  }
`;

export const Img = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100%;
  object-fit: cover;
`;
