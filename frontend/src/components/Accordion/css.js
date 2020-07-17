import styled from 'styled-components';
import spacing from '../../../theme/spacing';

export const AccordionBody = styled.div`
  width: 100%;
  z-index: 10;
`;

export const AccordionButton = styled.button`
  padding: ${spacing[5]} 0;
  z-index: 100;
`;

export const AccordionContent = styled.div`
  overflow: hidden;
  height: 0;
  transition: height 0.2s ease;
`;
