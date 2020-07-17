import styled from 'styled-components';
import { Wrapper } from '../../components/Wrapper';
import spacing from '../../../theme/spacing';
import { breakpoints } from '../../../theme/breakpoints';
import { typeScale, typeWeight } from '../../../theme/typography';

export const GridContainer = styled(Wrapper)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 24px;
  justify-items: center;
`;

export const GameCardSection = styled.section`
  padding: ${spacing[7]} ${spacing[5]};

  @media screen and (min-width: ${breakpoints[0]}px) {
    padding: ${spacing[9]} ${spacing[6]};
  }
`;

export const SectionHeading = styled.h2`
  font-size: ${typeScale.header3};
  margin-bottom: ${spacing[7]};
  padding-bottom: ${spacing[5]};
  font-weight: ${typeWeight.bold};
  border-bottom: 1px solid ${({ theme }) => theme.dividerColor};
  text-align: center;

  @media screen and (min-width: ${breakpoints[0]}px) {
    text-align: left;
  }
`;
