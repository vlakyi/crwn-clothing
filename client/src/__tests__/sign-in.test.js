import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import SignIn from '../components/sign-in/sign-in.component';

import { rest } from "msw";
import { setupServer } from "msw/node";

import { Provider } from 'react-redux';
import { store } from '../redux/store';

const server = setupServer(
    rest.post("/contact", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json('abc')
        );
    })
);

jest.mock('../components/modal/modal.component', () => ({ modalHeader, modalText, buttonText, closeModal }) => {
    return (
        <div>
            <h1>{modalHeader}</h1>
            <p>{modalText}</p>
            <button onClick={closeModal}>{buttonText}</button>
        </div>
    )
});

const renderProvider = (component) => render(<Provider store={store}>{component}</Provider>)

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
    server.resetHandlers();
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
        screen.debug();
    });

    it('Test SignIn form submission. Test modal open and close on submit', async () => {
        renderProvider(<SignIn />);

        const emailInput = screen.getByLabelText('Email');
        const password = screen.getByLabelText('Password');
        const signInButton = screen.getByText(/sign in$/i);

        userEvent.type(emailInput, 'test.user@gmail.com');
        await waitFor(() => expect(emailInput).toHaveValue('test.user@gmail.com'));

        userEvent.type(password, '12345');

        userEvent.click(signInButton);

        await waitFor(() => expect(screen.getByText('Login Fail').textContent).toEqual('Login Fail'));

        userEvent.click(screen.getByText('OK'));

        await waitFor(() => { expect(screen.queryByText('Login Fail')).not.toBeInTheDocument(); });
    });

});