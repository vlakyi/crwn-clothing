import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import SignIn from '../components/sign-in/sign-in.component';

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

    it('render SignIn component', () => {
        renderProvider(<SignIn />);
        expect(screen.getByText('I already have an account')).toBeInTheDocument();
        expect(screen.getByText('Sign in with your email and password')).toBeInTheDocument();
        expect(screen.getByText(/Sign in$/i)).toBeInTheDocument();
        expect(screen.getByText(/login/i)).toBeInTheDocument();
        userEvent.click(screen.getByText(/sign in$/i));

        screen.debug();
    });

    it('Test SignIn with wrong credentials', async () => {
        const { rerender } = renderProvider(<SignIn />);

        const emailInput = screen.getByLabelText('Email');
        const password = screen.getByLabelText('Password');
        const signInButton = screen.getByText(/sign in$/i);

        userEvent.type(emailInput, 'test.user@gmail.com');
        await waitFor(() => expect(emailInput).toHaveValue('test.user@gmail.com'));

        userEvent.type(password, '12345');

        userEvent.click(signInButton);
        rerender(<Provider store={store}><SignIn /></Provider>);

        await waitFor(() => expect(screen.getByText('Sign In Fail').textContent).toEqual('Sign In Fail'));

        userEvent.click(screen.getByText('OK'));

        await waitFor(() => { expect(screen.queryByText('Sign In Fail')).not.toBeInTheDocument(); });
    });

    it('Test SignIn successfully', async () => {
        const { rerender } = renderProvider(<SignIn />);

        const emailInput = screen.getByLabelText('Email');
        const password = screen.getByLabelText('Password');
        const signInButton = screen.getByText(/sign in$/i);

        userEvent.type(emailInput, 'test.user@gmail.com');
        await waitFor(() => expect(emailInput).toHaveValue('test.user@gmail.com'));

        userEvent.type(password, '12345678');

        userEvent.click(signInButton);
        rerender(<Provider store={store}><SignIn /></Provider>);

        await waitFor(() => { expect(screen.queryByText('Sign In Fail')).not.toBeInTheDocument(); });
    });

});