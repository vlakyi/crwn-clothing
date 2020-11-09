import React, { useReducer } from 'react';
import { ContactContainer, GroupContainer, StyledForm, StyledHeader, StyledTextArea, IconContainer, ArrowUp, InnerArrowUp, Box} from './contact.styles';
import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';
import {FormInputLabel as FormTextAreaLabel} from '../../components/form-input/form-input.styles';

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
        default:
            return state;
    }
};

const ContactPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, email, message } = state;

    const handleInputChange = (e) => {
        dispatch({ type: e.target.name, payload: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <ContactContainer>
            <IconContainer>
                <ArrowUp>
                    <InnerArrowUp />
                </ArrowUp>
                <Box/>
            </IconContainer>
            <div>
                <StyledHeader main>Connect with us.</StyledHeader>
                <StyledHeader>Write your question below.</StyledHeader>
                <StyledForm>
                    <FormInput handleChange={handleInputChange} name='name' label='Name' value={name} style={{ gridArea: 'name' }} />
                    <FormInput handleChange={handleInputChange} name='email' label='Email' type='email' value={email} style={{ gridArea: 'email' }} />
                    <GroupContainer>
                        <StyledTextArea onChange={handleInputChange} name='message' />
                        <FormTextAreaLabel className='form-textarea-label' shrink={message} value={message}> Message </FormTextAreaLabel>
                    </GroupContainer>
                    <CustomButton onClick={handleSubmit} style={{fontSize: 14}}> Submit </CustomButton>
                </StyledForm>
            </div>
        </ContactContainer>
    )
}

export default ContactPage
