import React from 'react';
import styled from 'styled-components';
import { bool, array, number } from 'prop-types';
import spacing from '../../../theme/spacing';
import { v4 as uuidv4 } from 'uuid';

const DotComponent = styled.span`
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.primaryColor};
  background: ${({ active, theme }) => (active ? theme.primaryColor : 'white')};
`;

const DotsContainer = styled.div`
  // position: absolute;
  // bottom: 0;
  margin-top: ${spacing[5]};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dot = ({ active }) => <DotComponent active={active} />;

Dot.propTypes = {
  active: bool.isRequired
};

const Dots = ({ slides, activeIndex }) => (
  <DotsContainer>
    {slides.map((slide, i) => (
      <Dot key={slide} active={activeIndex === i} index={i} key={uuidv4()} />
    ))}
  </DotsContainer>
);

Dots.propTypes = {
  slides: array.isRequired,
  activeIndex: number.isRequired
};

export default Dots;
