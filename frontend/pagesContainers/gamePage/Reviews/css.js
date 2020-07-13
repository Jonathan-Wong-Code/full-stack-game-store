import styled from 'styled-components';
import { SubHeading } from '../common.css';
import spacing from '../../../theme/spacing';
import { typeWeight } from '../../../theme/typography';
// REVIEWS

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
  justify-content: flex-end;
  border-top: ${({ theme, noUserReview }) =>
    noUserReview ? `1px solid ${theme.dividerColor}` : null};
`;

export const Label = styled.label`
  margin-right: ${spacing[2]};
  margin-left: ${spacing[7]};
  font-weight: ${typeWeight.bold};
`;
