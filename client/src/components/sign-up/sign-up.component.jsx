import React, { useState, useCallback } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Modal from '../modal/modal.component';
import useModal from '../../hooks/useModal/useModal';

import { useDispatch, useSelector } from 'react-redux';
import UserActionTypes from '../../redux/user/user.types';
import { selectUserError } from '../../redux/user/user.selectors';

import { SignUpContainer, SignUpTitle, SignUpForm } from './sign-up.styles';

import { debounce } from 'lodash';

const SignUp = () => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { displayName, email, password, confirmPassword } = userCredentials;

    // Redux
    const dispatch = useDispatch();
    const userError = useSelector(selectUserError);
    const { CLEAN_USER_ERROR, SIGN_UP_START } = UserActionTypes;

    // modal Config
    const [modalState, dispatchModal] = useModal();
    const { isDisplay, isSuccess, modalHeader, modalText, buttonText } = modalState;

    // eslint-disable-next-line
    const signUpStartDebounced = useCallback(debounce((displayName, email, password) => dispatch({ type: SIGN_UP_START, payload: { displayName, email, password } }), 500), []);

    if (userError?.error_type === 'signup' && !isDisplay) {
        dispatchModal({
            type: 'openModal', payload: {
                modalHeader: 'Sign Up Fail',
                modalText: userError?.code === "auth/email-already-in-use" ? userError.message : 'Check your credentials and try again',
                buttonText: 'OK'
            }
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            dispatchModal({
                type: 'openModal', payload: {
                    modalHeader: 'Failed to register',
                    modalText: "Passwords don't match, check it and try again",
                    buttonText: 'OK'
                }
            });
            return;
        }
        signUpStartDebounced(displayName, email, password);
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value })
    }

    return (
        <SignUpContainer>
            <SignUpTitle>I do not have a account</SignUpTitle>
            <span>Sign up with your email and password</span>
            <SignUpForm onSubmit={handleSubmit}>
                <FormInput
                    id='signUpDisplayName'
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />

                <FormInput
                    id='signUpEmail'
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    autoComplete='username'
                    required
                />

                <FormInput
                    id='signUpPassword'
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    autoComplete='new-password'
                    pattern=".{8,}"
                    title="8 characters minimum"
                    required
                />

                <FormInput
                    id='signUpConfirmPassword'
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    autoComplete='new-password'
                    pattern=".{8,}"
                    required
                />

                <CustomButton type='submit'>SIGN UP</CustomButton>

            </SignUpForm>
            {isDisplay && <Modal closeModal={() => {
                dispatchModal({ type: 'closeModal' });
                dispatch({ type: CLEAN_USER_ERROR });
            }} modalHeader={modalHeader} modalText={modalText} buttonText={buttonText} isSuccess={isSuccess} />}
        </SignUpContainer>
    );
}

export default SignUp;