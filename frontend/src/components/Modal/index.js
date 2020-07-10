import React from 'react';
import { node, func } from 'prop-types';

import { ModalBackground, ModalBody, CloseButton } from './css';

const Modal = ({ children, closeModal }) => {
  return (
    <ModalBackground onClick={closeModal}>
      <ModalBody onClick={e => e.stopPropagation()}>
        {children}
        <CloseButton onClick={closeModal}>&#x2715;</CloseButton>
      </ModalBody>
    </ModalBackground>
  );
};

Modal.propTypes = {
  children: node.isRequired,
  closeModal: func.isRequired
};

export default Modal;
