import React, { useEffect } from 'react';
import { node, func } from 'prop-types';

/* eslint-disable no-param-reassign */

import { ModalBackground, ModalBody, CloseButton } from './css';
const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    const dialog = document.getElementById('modal-dialog');
    const pageElements = Array.from(
      document.getElementById('root-page').children
    );

    pageElements.forEach(child => {
      if (child !== dialog) {
        child.inert = true;
      }
    });

    const header = document.getElementById('header');

    header.inert = true;

    return () => {
      header.inert = false;
      pageElements.forEach(child => {
        if (child !== dialog) {
          child.inert = false;
        }
      });
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
