import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { string, func, oneOfType, array, bool } from 'prop-types';

import IconButton from '../IconButton';
import arrowLeft from '../../assets/icons/arrowLeft.svg';
import arrowRight from '../../assets/icons/arrowRight.svg';

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
  isFocusedOnMount
}) => {
  const buttonRef = useRef();

  useEffect(() => {
    if (isFocusedOnMount) {
      buttonRef.current.focus();
    }
  }, []);

  return (
    <ArrowComponent direction={direction} left={left} right={right} aria-hidden>
      {direction === 'left' ? (
        <IconButton
          Icon={arrowLeft}
          onClick={handleClick}
          description="Previous game"
          variants={variants}
          ref={buttonRef}
        />
      ) : (
        <IconButton
          Icon={arrowRight}
          onClick={handleClick}
          description="Next game"
          variants={variants}
          ref={buttonRef}
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
  isFocusedOnMount: bool
};

CenteredArrow.defaultProps = {
  variants: null,
  left: '0',
  right: '0',
  isFocusedOnMount: false
};

export default CenteredArrow;
