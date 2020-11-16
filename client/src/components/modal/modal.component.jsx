import React from 'react'
import { Overlay, ModalContainer, ModalHeader, ModalText } from './modal.styles';
import CustomButton from '../custom-button/custom-button.component';
import {ReactComponent as SuccessIcon} from '../../assets/modal-success.svg';
import {ReactComponent as FailureIcon} from '../../assets/modal-failure.svg';

const Modal = ({ isSuccess, handleButtonClick, modalHeader, modalText, buttonText }) => {
    return (
        <Overlay>
            <ModalContainer>
                {isSuccess ? <SuccessIcon /> : <FailureIcon/>}
                <ModalHeader>{modalHeader}</ModalHeader>
                <ModalText>{modalText}</ModalText>
                <CustomButton onClick={handleButtonClick}>{buttonText}</CustomButton>
            </ModalContainer>
        </Overlay>
    );
}

export default Modal;
