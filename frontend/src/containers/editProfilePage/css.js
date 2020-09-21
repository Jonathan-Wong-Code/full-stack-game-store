import styled from 'styled-components';

export const Section = styled.section`
  margin-top: ${({ theme }) => theme.spacing[9]};
`;

export const Img = styled.img`
  border-radius: 50%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const ImgContainer = styled.div`
  height: 150px;
  width: 150px;
  margin: 0 auto ${({ theme }) => theme.spacing[6]} auto;
`;

export const FileInput = styled.input`
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
  padding: 1rem 0;
`;
