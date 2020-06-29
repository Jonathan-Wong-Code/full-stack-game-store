import React from 'react';
import styled from 'styled-components';

const ArrowComponent = styled.button`
  display: flex;
  position: absolute;
  top: 50%;
  ${props => (props.direction === 'right' ? `right: 45px` : `left: 25px`)};
  height: 50px;
  width: 50px;
  transform: translateY(-50%);
  justify-content: center;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  transition: transform ease-in 0.1s;
  &:hover {
    transform: scale(1.1) translateY(-50%);
  }
  img {
    transform: translateX(
      ${props => (props.direction === 'left' ? '-2' : '2')}px
    );
    &:focus {
      outline: 0;
    }
  }
`;

const Arrow = ({ direction, handleClick }) => (
  <ArrowComponent direction={direction} onClick={handleClick} tabIndex={5}>
    {direction === 'right' ? <span>right</span> : <span>left</span>}
  </ArrowComponent>
);

export default Arrow;
