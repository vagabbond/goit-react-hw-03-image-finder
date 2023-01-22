import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { ModalStyled, ModalOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    e.code === 'Escape' && this.props.toggleModal();
  };

  handleBackdropClick = e => {
    e.target === e.currentTarget && this.props.toggleModal();
  };
  render() {
    return createPortal(
      <ModalOverlay onClick={this.handleBackdropClick}>
        <ModalStyled>
          <img
            src={this.props.largeImg}
            alt=""
            style={{ width: 900, height: 650 }}
          />
        </ModalStyled>
      </ModalOverlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
};
