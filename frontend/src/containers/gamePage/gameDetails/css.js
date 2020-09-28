import styled from 'styled-components';
// DESCRIPTION STYLES

export const DescriptionDetailsSection = styled.section`
  display: flex;
  padding: ${({ theme }) => theme.spacing[7]} 0;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    flex-direction: row;
  }
`;

export const DescriptionContainer = styled.div`
  font-weight: ${({ theme }) => theme.typeWeight.light};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    width: 70%;
    margin-right: ${({ theme }) => theme.spacing[7]};
  }
`;

export const GameDetailsContainer = styled.div`
  padding-top: ${({ theme }) => theme.spacing[7]};
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    width: 30%;
    padding-top: 0;
  }
`;

export const DetailList = styled.ul`
  width: 100%;
`;

export const Detail = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
