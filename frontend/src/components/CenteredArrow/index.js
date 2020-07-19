import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { string, func, oneOfType, array, bool } from 'prop-types';

import IconButton from '../IconButton';
import { ArrowLeft, ArrowRight } from '../../assets/icons';

const ArrowComponent = styled.div`
  position: absolute;
  top: 50%;
  ${({ direction, left, right }) =>
    direction === 'right' ? `right: ${right}` : `left: ${left}`};
  transform: translateY(-50%);
  z-index: 10;
`;

const CenteredArrow = ({
  direction,
  handleClick,
  variants,
  left,
  right,
  isFocusedOnMount,
  description
}) => {
  const buttonRef = useRef();

  useEffect(() => {
    if (isFocusedOnMount) {
      buttonRef.current.focus();
    }
  }, []);

  return (
    <ArrowComponent
      direction={direction}
      left={left}
      right={right}
      data-testid="arrow-component"
      description
    >
      {direction === 'left' ? (
        <IconButton
          Icon={ArrowLeft}
          onClick={handleClick}
          description={description}
          variants={variants}
          ref={buttonRef}
          data-testid="arrow-left"
        />
      ) : (
        <IconButton
          Icon={ArrowRight}
          onClick={handleClick}
          description={description}
          variants={variants}
          ref={buttonRef}
          data-testid="arrow-right"
        />
      )}
    </ArrowComponent>
  );
};

CenteredArrow.propTypes = {
  direction: string.isRequired,
  handleClick: func.isRequired,
  variants: oneOfType([string, array]),
  left: string,
  right: string,
  isFocusedOnMount: bool,
  description: string.isRequired
};

CenteredArrow.defaultProps = {
  variants: null,
  left: '0',
  right: '0',
  isFocusedOnMount: false
};

export default CenteredArrow;
