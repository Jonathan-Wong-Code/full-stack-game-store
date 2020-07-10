import styled from 'styled-components';
import spacing from '../../theme/spacing';

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

export const DetailList = styled.ul`
  width: 100%;
`;

export const Detail = styled.li`
  margin-bottom: ${spacing[2]};
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
