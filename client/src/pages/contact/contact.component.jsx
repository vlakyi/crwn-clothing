import React, { useReducer, useCallback } from 'react';
import { ContactContainer, GroupContainer, StyledForm, StyledHeader, StyledTextArea, IconContainer, ArrowUp, InnerArrowUp, Box } from './contact.styles';
import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';
import { FormInputLabel as FormTextAreaLabel } from '../../components/form-input/form-input.styles';

import Modal from '../../components/modal/modal.component';
import useModal from '../../hooks/useModal/useModal';

import { debounce } from 'lodash';
import axios from 'axios';

const initialState = {
    name: '',
    email: '',
    message: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'name':
            return { ...state, name: action.payload }
        case 'email':
            return { ...state, email: action.payload }
        case 'message':
            return { ...state, message: action.payload }
        case 'clear':
            return { ...initialState }
        default:
            return state;
    }
};

const ContactPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [modalState, dispatchModal] = useModal();

    const { name, email, message } = state;
    const { isDisplay, isSuccess, modalHeader, modalText, buttonText } = modalState;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: name, payload: value });
    }
    // eslint-disable-next-line
    const handleSubmitDebounced = useCallback(debounce(async ({ name, email, message }) => {
        let modalData = {
            modalHeader: 'Wrong credentials',
            modalText: 'Fill all inputs first',
            buttonText: 'OK'
        };
        let showModal = false;

        if (name.length > 0 && message.length > 0) {
            try {
                dispatch({ type: 'clear' });
                await axios.post('contact', { name, email, message });
                modalData = { isSuccess: true, modalHeader: 'Success', modalText: 'Thank you for message :)', buttonText: 'Close' }
                showModal = true;
            } catch (error) {
                modalData = { ...modalData, modalText: error.response.data };
                showModal = true;
            }
        }
        else
            showModal = true;

        showModal && dispatchModal({ type: 'openModal', payload: modalData });

    }, 500), []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSubmitDebounced(state);
    }

    return (
        <ContactContainer>
            <IconContainer>
                <ArrowUp>
                    <InnerArrowUp />
                </ArrowUp>
                <Box />
            </IconContainer>

            <div>
                <StyledHeader main>Connect with us.</StyledHeader>
                <StyledHeader>Write your question below.</StyledHeader>
                <StyledForm onSubmit={handleSubmit}>
                    <FormInput
                        handleChange={handleInputChange}
                        id="contactPageName"
                        name='name'
                        label='Name'
                        value={name}
                        required
                        style={{ gridArea: 'name' }} />

                    <FormInput
                        handleChange={handleInputChange}
                        id="contactPageEmail"
                        name='email'
                        label='Email'
                        type='email'
                        value={email}
                        autoComplete='username'
                        pattern='(.+)@(.+){2,}\.(.+){2,}'
                        title="Contact's email (format: xxx@xxx.xxx)"
                        required
                        style={{ gridArea: 'email' }} />

                    <GroupContainer>
                        <StyledTextArea
                            onChange={handleInputChange}
                            name='message'
                            id="message"
                            value={message}
                            required
                        />

                        <FormTextAreaLabel
                            className='form-textarea-label'
                            htmlFor='message'
                            shrink={message}> Message </FormTextAreaLabel>

                    </GroupContainer>

                    <CustomButton
                        type='submit'
                        style={{ fontSize: 14 }}> Submit </CustomButton>
                </StyledForm>
            </div>
            {isDisplay && <Modal closeModal={() => dispatchModal({ type: 'closeModal' })} modalHeader={modalHeader} modalText={modalText} buttonText={buttonText} isSuccess={isSuccess} />}
        </ContactContainer>
    )
}

export default ContactPage;
