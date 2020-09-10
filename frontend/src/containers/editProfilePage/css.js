import styled from 'styled-components';

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
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
`;
