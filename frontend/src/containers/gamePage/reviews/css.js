import styled from 'styled-components';
import { SubHeading } from '../index.css';
import spacing from '../../../../theme/spacing';
import { typeWeight } from '../../../../theme/typography';

export const Section = styled.section`
  padding-bottom: ${spacing[7]};
`;

export const ReviewContainer = styled.li`
  width: 100%;
`;

export const ReviewHeading = styled(SubHeading)`
  margin-bottom: 0;
`;

export const FilterBar = styled.div`
  padding-bottom: ${spacing[5]};
  padding-top: ${spacing[5]};

  display: flex;
  flex-direction: column;

  border-top: ${({ theme, noUserReview }) =>
    noUserReview ? `1px solid ${theme.dividerColor}` : null};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    justify-content: flex-end;
    flex-direction: row;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: ${spacing[5]};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Select = styled.select`
  padding: 5px;
  border-radius: 5px;
`;

export const Label = styled.label`
  font-weight: ${typeWeight.bold};
  margin-bottom: ${spacing[2]};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    margin: 0 ${spacing[2]} 0 ${spacing[7]};
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
`;
