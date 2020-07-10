import styled from 'styled-components';
import spacing from '../../../theme/spacing';
export const Thumbnails = styled.div`
  display: flex;
`;

export const ThumbNailImg = styled.img`
  border: ${({ active }) => (active ? '3px solid white' : null)};
`;

export const Button = styled.button`
  margin-right: ${spacing[5]};
  margin-top: ${spacing[5]};
`;

export const ImgContainer = styled.div`
  position: relative;
`;
