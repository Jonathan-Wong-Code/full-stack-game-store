import styled from 'styled-components';
import spacing from '../../../theme/spacing';
import { typeWeight } from '../../../theme/typography';

export const ModalBackground = styled.div`
  display: flex;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: rgba(0, 0, 0, 0.75);
  z-index: 100;
`;

export const ModalBody = styled.div`
  z-index: 101;
  margin: auto;
  position: relative;
  animation: 0.5s ease fadeIn;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  padding: ${spacing[1]} ${spacing[2]};
  font-weight: ${typeWeight.bold};

  background-color: ${({ theme }) => theme.grey};
`;
