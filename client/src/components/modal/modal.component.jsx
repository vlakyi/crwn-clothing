import React from 'react'
import { createPortal } from 'react-dom'
import { Overlay, ModalContainer, ModalHeader, ModalText } from './modal.styles';
import CustomButton from '../custom-button/custom-button.component';
import { ReactComponent as SuccessIcon } from '../../assets/modal-success.svg';
import { ReactComponent as FailureIcon } from '../../assets/modal-failure.svg';

const Modal = ({ isSuccess, closeModal, modalHeader, modalText, buttonText }) => {
    return (
        createPortal(
            <Overlay>
                <ModalContainer>
                    {isSuccess ? <SuccessIcon /> : <FailureIcon />}
                    <ModalHeader>{modalHeader}</ModalHeader>
                    <ModalText>{modalText}</ModalText>
                    <CustomButton onClick={closeModal}>{buttonText}</CustomButton>
                </ModalContainer>
            </Overlay>
            , document.querySelector('#modal-root'))
    );
};

export default Modal;
