import styled from 'styled-components';

export const CartItemContainer = styled.div`
  display: flex;
  align-items: center;

  padding: ${({ theme }) => theme.spacing[5]} 0;

  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.dividerColor};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    flex-direction: row;
    padding 0;
    padding-right: ${({ theme }) => theme.spacing[6]};
  }
`;

export const ImgContainer = styled.div`
  width: 200px;
  border-right: 1px solid ${({ theme }) => theme.dividerColor};
  margin-bottom: ${({ theme }) => theme.spacing[5]};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    width: 125px;
    margin-bottom: 0;
  }
`;

export const Img = styled.img`
  height: 100%;
  object-fit: cover;
  display: block;
  min-width: 100px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    min-width: 125px;
  }
`;

export const H3 = styled.h3`
  ${({ theme }) => theme.typeWeight.bold};
  font-size: ${({ theme }) => theme.typeScale.paragrph};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    font-size: ${({ theme }) => theme.typeScale.heading5};
  }
`;

export const GameTitle = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  text-align: center;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    margin-left: ${({ theme }) => theme.spacing[6]};
    flex-grow: 1;
    margin-bottom: 0;
    text-align: left;
  }
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
