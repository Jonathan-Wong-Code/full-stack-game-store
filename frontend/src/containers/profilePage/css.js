import styled from 'styled-components';

export const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[9]} 0;
`;

export const H2 = styled.h2`
  font-size: ${({ theme }) => theme.typeScale.header1};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

export const ImgContainer = styled.div`
  height: 175px;
  width: 175px;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

export const Img = styled.img`
  border-radius: 50%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const P = styled.p`
  font-size: ${({ theme }) => theme.typeScale.header3};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const StyledLink = styled.a`
  background: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.textInverted};

  border-radius: 5px;
  min-width: 150px;

  padding: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[2]};
  cursor: pointer;

  font-weight: ${({ theme }) => theme.typeWeight.bold};
  text-align: center;
`;
