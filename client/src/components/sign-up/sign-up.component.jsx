import React, { useState, useCallback } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

import { SignUpContainer, SignUpTitle, SignUpForm } from './sign-up.styles';

import { debounce } from 'lodash';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;
    
    // eslint-disable-next-line
    const signUpStartDebounced = useCallback(debounce((displayName, email, password) => signUpStart({ displayName, email, password }), 500), []);

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords don't match");
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
        </SignUpContainer>
    );
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (user) => dispatch(signUpStart(user))
});

export default connect(null, mapDispatchToProps)(SignUp);