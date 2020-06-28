import React from 'react';
import styled from 'styled-components';
import { bool, array, number } from 'prop-types';

const DotComponent = styled.span`
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 50%;
  background: ${({ active, theme }) => (active ? theme.primaryColor : 'white')};
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 0;
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
      <Dot key={slide} active={activeIndex === i} index={i} />
    ))}
  </DotsContainer>
);

Dots.propTypes = {
  slides: array.isRequired,
  activeIndex: number.isRequired
};

export default Dots;
