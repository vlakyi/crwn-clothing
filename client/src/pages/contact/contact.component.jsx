import React, { useReducer } from 'react';
import { ContactContainer, GroupContainer, StyledForm, StyledHeader, StyledTextArea, IconContainer, ArrowUp, InnerArrowUp, Box } from './contact.styles';
import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';
import { FormInputLabel as FormTextAreaLabel } from '../../components/form-input/form-input.styles';
import { debounce } from 'lodash';
import axios from 'axios';

import { useCallback } from 'react';

const initialState = {
    name: '',
    email: '',
    message: ''
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'name':
            return { ...state, name: action.payload }
        case 'email':
            return { ...state, email: action.payload }
        case 'message':
            return { ...state, message: action.payload }
        default:
            return state;
    }
};

const ContactPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, email, message } = state;

    const dispatchInputValue = useCallback(debounce((name, value) => dispatch({ type: name, payload: value }), 150), []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatchInputValue(name, value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.includes('@')) {
            try {
                const { data, status } = await axios({
                    url: 'contact',
                    method: 'post',
                    data: {
                        name, email, message
                    }
                });
                console.log(data, status);
            } catch (error) {
                console.log(error);
            }
        }
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
                <StyledForm>
                    <FormInput
                        handleChange={handleInputChange}
                        id="contactPageName"
                        name='name'
                        label='Name'
                        value={name}
                        style={{ gridArea: 'name' }} />

                    <FormInput
                        handleChange={handleInputChange}
                        id="contactPageEmail"
                        name='email'
                        label='Email'
                        type='email'
                        value={email}
                        autoComplete='username'
                        style={{ gridArea: 'email' }} />

                    <GroupContainer>
                        <StyledTextArea
                            onChange={handleInputChange}
                            name='message'
                            id="message" />

                        <FormTextAreaLabel
                            className='form-textarea-label'
                            htmlFor='message'
                            shrink={message}> Message </FormTextAreaLabel>

                    </GroupContainer>

                    <CustomButton
                        onClick={handleSubmit}
                        style={{ fontSize: 14 }}> Submit </CustomButton>
                </StyledForm>
            </div>

        </ContactContainer>
    )
}

export default ContactPage;
