import styled from 'styled-components';

export const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.dividerColor};
  padding-right: ${({ theme }) => theme.spacing[6]};
`;

export const ImgContainer = styled.div`
  width: 125px;
  border-right: 1px solid ${({ theme }) => theme.dividerColor};
`;

export const H3 = styled.h3`
  ${({ theme }) => theme.typeWeight.bold};
  font-size: ${({ theme }) => theme.typeScale.heading5};
`;

export const GameTitle = styled.div`
  margin-left: ${({ theme }) => theme.spacing[6]};
  flex-grow: 1;
`;

export const RemoveButton = styled.button`
  font-size: ${({ theme }) => theme.typeScale.helperText};
  font-weight: ${({ theme }) => theme.typeWeight.light};
  text-decoration: underline;
`;

export const Prices = styled.div`
  display: flex;
  font-weight: ${({ theme }) => theme.typeWeight.bold};
`;

export const OriginalPrice = styled.p`
  margin-right: ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.primaryColor};
  text-decoration: line-through;
`;
