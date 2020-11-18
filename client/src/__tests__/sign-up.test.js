import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import SignUp from '../components/sign-up/sign-up.component';

import { Provider } from 'react-redux';
import { store } from '../redux/store';

jest.mock('../components/modal/modal.component', () => ({ modalHeader, modalText, buttonText, closeModal }) => {
    return (
        <div>
            <h1>{modalHeader}</h1>
            <p>{modalText}</p>
            <button onClick={closeModal}>{buttonText}</button>
        </div>
    )
});

const renderProvider = (component) => render(<Provider store={store}>{component}</Provider>);

afterEach(() => {
    cleanup();
});

describe('Contact page test', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('render SignUp component', () => {
        renderProvider(<SignUp />);
        expect(screen.getByText('I do not have a account')).toBeInTheDocument();
        expect(screen.getByText('Sign up with your email and password')).toBeInTheDocument();
        expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByText(/sign up$/i)).toBeInTheDocument();

        screen.debug();
    });

    it('Test Sign Up with wrong credentials', async () => {
        const { rerender } = renderProvider(<SignUp />);

        const displayName = screen.getByLabelText(/display name/i);
        const email = screen.getByLabelText(/email/i);
        const password = screen.getByLabelText(/^password/i);
        const confirmPassword = screen.getByLabelText(/confirm password/i);

        const signUpButton = screen.getByText(/sign up$/i);

        userEvent.type(displayName, 'Test User');
        await waitFor(() => expect(displayName).toHaveValue('Test User'));

        userEvent.type(email, 'test.user123@gmail.com');
        await waitFor(() => expect(email).toHaveValue('test.user123@gmail.com'));

        userEvent.type(password, '12345678');
        userEvent.type(confirmPassword, '123456789');

        userEvent.click(signUpButton);
        rerender(<Provider store={store}><SignUp /></Provider>);

        await waitFor(() => expect(screen.getByText('Sign Up Fail').textContent).toEqual('Sign Up Fail'));

        userEvent.click(screen.getByText('OK'));

        await waitFor(() => { expect(screen.queryByText('Sign Up Fail')).not.toBeInTheDocument(); });
    });

    it('Test SignIn successfully', async () => {
        const { rerender } = renderProvider(<SignUp />);

        const displayName = screen.getByLabelText(/display name/i);
        const email = screen.getByLabelText(/email/i);
        const password = screen.getByLabelText(/^password/i);
        const confirmPassword = screen.getByLabelText(/confirm password/i);

        const signUpButton = screen.getByText(/sign up$/i);

        userEvent.type(displayName, 'Test User');
        await waitFor(() => expect(displayName).toHaveValue('Test User'));

        userEvent.type(email, 'test.user123@gmail.com');
        await waitFor(() => expect(email).toHaveValue('test.user123@gmail.com'));

        userEvent.type(password, '12345678');
        userEvent.type(confirmPassword, '12345678');

        userEvent.click(signUpButton);
        rerender(<Provider store={store}><SignUp /></Provider>);

        await waitFor(() => { expect(screen.queryByText('Sign Up Fail')).not.toBeInTheDocument(); });
    });

});