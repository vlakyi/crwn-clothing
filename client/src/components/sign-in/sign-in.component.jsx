import React, { useState, useEffect, useCallback } from 'react';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { SignInContainer, ButtonsContainer, SignInTitle } from './sign-in.styles';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import { debounce } from 'lodash';

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' });
    const { email, password } = userCredentials;
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(window.innerWidth);
    }, [width]);

    // eslint-disable-next-line
    const emailSignInStartDebounced = useCallback(debounce((email, password) => emailSignInStart(email, password), 500), []);
    // eslint-disable-next-line
    const googleSignInStartDebounced = useCallback(debounce(() => googleSignInStart(), 500), []);

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
        </SignInContainer>
    );
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);