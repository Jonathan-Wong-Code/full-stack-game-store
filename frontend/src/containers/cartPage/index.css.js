import styled from 'styled-components';
import { SecondaryButton } from '../../components/Buttons';

export const H2 = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing[7]};
`;

export const OrderSummary = styled.section`
  margin-top: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ theme }) => theme.contentBackgroundLight};
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
`;

export const TotalsBar = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[6]} 0;

  font-weight: ${({ theme }) => theme.typeWeight.bold};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    justify-content: flex-end;
    padding-right: ${({ theme }) => theme.spacing[6]};
  }
`;

export const CheckoutContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CheckoutButton = styled(SecondaryButton)`
  margin-top: ${({ theme }) => theme.spacing[6]};
  text-transform: uppercase;
  font-weight: 700;
`;

export const TotalSavings = styled.p`
  font-weight: ${({ theme }) => theme.typeWeight.normal};
  color: ${({ theme }) => theme.primaryColor};
`;
