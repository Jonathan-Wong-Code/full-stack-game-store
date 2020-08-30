import React, { useEffect } from 'react';
import { node, func } from 'prop-types';

/* eslint-disable no-param-reassign */

import { ModalBackground, ModalBody, CloseButton } from './css';
const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    const dialog = document.getElementById('modal-dialog');
    Array.from(document.getElementById('root-page').children).forEach(child => {
      if (child !== dialog) {
        child.inert = true;
      }
    });
    document.getElementById('header').inert = true;

    return () => {
      document.getElementById('header').inert = false;
      Array.from(document.getElementById('root-page').children).forEach(
        child => {
          if (child !== dialog) {
            child.inert = false;
          }
        }
      );
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.which === 27) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ModalBackground
      onClick={closeModal}
      aria-modal="true"
      role="dialog"
      id="modal-dialog"
    >
      <ModalBody onClick={e => e.stopPropagation()}>
        {children}
        <CloseButton onClick={closeModal} data-testid="modal-close-button">
          &#x2715;
        </CloseButton>
      </ModalBody>
    </ModalBackground>
  );
};

Modal.propTypes = {
  children: node.isRequired,
  closeModal: func.isRequired
};

export default Modal;
