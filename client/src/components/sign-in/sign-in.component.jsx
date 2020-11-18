import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectSignInError } from '../../redux/user/user.selectors';
import UserActionTypes from '../../redux/user/user.types';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Modal from '../modal/modal.component';
import useModal from '../../hooks/useModal/useModal';

import { SignInContainer, ButtonsContainer, SignInTitle } from './sign-in.styles';

import { debounce } from 'lodash';

const SignIn = () => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' });
    const { email, password } = userCredentials;
    const [width, setWidth] = useState(0);

    //Redux
    const { GOOGLE_SIGN_IN_START, EMAIL_SIGN_IN_START, CLEAN_SIGN_IN_FAILURE } = UserActionTypes;
    const dispatch = useDispatch();
    const signInError = useSelector(selectSignInError);

    // Modal config
    const [modalState, dispatchModal] = useModal();
    const { isDisplay, isSuccess, modalHeader, modalText, buttonText } = modalState;

    if ((signInError?.code === 'auth/user-not-found' || signInError?.code === 'auth/wrong-password') && !isDisplay) {
        dispatchModal({
            type: 'openModal', payload: {
                modalHeader: 'Login Fail',
                modalText: 'Check your credentials and try again',
                buttonText: 'OK'
            }
        });

    }

    useEffect(() => {
        setWidth(window.innerWidth);
    }, [width]);

    // eslint-disable-next-line
    const emailSignInStartDebounced = useCallback(debounce((email, password) => dispatch({ type: EMAIL_SIGN_IN_START, payload: { email, password } }), 500), []);
    // eslint-disable-next-line
    const googleSignInStartDebounced = useCallback(debounce(() => dispatch({ type: GOOGLE_SIGN_IN_START }), 500), []);

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStartDebounced(email, password);
    };

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <SignInContainer>
            <SignInTitle>I already have an account </SignInTitle>
            <span>Sign in with your email and password </span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    id='singInEmail'
                    name='email'
                    type='email'
                    value={email} required
                    handleChange={handleChange}
                    autoComplete='username'
                    label='Email'
                    pattern='(.+)@(.+){2,}\.(.+){2,}'
                    title="Contact's email (format: xxx@xxx.xxx)"
                />

                <FormInput
                    id='signInPassword'
                    name='password'
                    type='password'
                    value={password} required
                    handleChange={handleChange}
                    label='Password'
                    autoComplete='current-password'
                />
                <ButtonsContainer>
                    <CustomButton type='submit'> Sign in </CustomButton>
                    <CustomButton type='button' onClick={googleSignInStartDebounced} isGoogleSignIn>{width < 425 ? 'Google' : 'Login with Google'}</CustomButton>
                </ButtonsContainer>
            </form>

            {isDisplay && <Modal closeModal={() => {
                dispatchModal({ type: 'closeModal' });
                dispatch({ type: CLEAN_SIGN_IN_FAILURE });
            }} modalHeader={modalHeader} modalText={modalText} buttonText={buttonText} isSuccess={isSuccess} />}
        </SignInContainer>
    );
}

export default SignIn;