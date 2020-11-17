import React from 'react';
import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import ContactPage from '../pages/contact/contact.component';

import { rest } from "msw";
import { setupServer } from "msw/node";

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

    it('render ContactPage', () => {
        render(<ContactPage />);
        expect(screen.getByText('Connect with us.')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        screen.debug();
    });

    it('Test ContactPage form submission. Test modal open and close on submit', async () => {
        render(<ContactPage />);

        const nameInput = screen.getByLabelText('Name');
        const emailInput = screen.getByLabelText('Email');
        const messageTextArea = screen.getByLabelText('Message');
        const submitButton = screen.getByRole('button');

        userEvent.type(nameInput, 'TestUser');
        await waitFor(() => expect(nameInput).toHaveValue('TestUser'));

        userEvent.type(emailInput, 'test.user@gmail.com');
        await waitFor(() => expect(emailInput).toHaveValue('test.user@gmail.com'));

        fireEvent.change(messageTextArea, { target: { value: 'JavaScript' } });
        await waitFor(() => expect(messageTextArea).toHaveValue('JavaScript'));

        userEvent.click(submitButton);

        await waitFor(() => { expect(nameInput).toHaveValue('') });
        await waitFor(() => { expect(emailInput).toHaveValue('') });
        await waitFor(() => { expect(messageTextArea).toHaveValue('') });

        expect(screen.getByText('Success').textContent).toEqual('Success');

        userEvent.click(screen.getByText('Close'));

        await waitFor(() => { expect(screen.queryByText('Success')).not.toBeInTheDocument(); });
    });

    it('Test modal open and close on empty form submition', async () => {
        render(<ContactPage />);

        const submitButton = screen.getByRole('button');

        userEvent.click(submitButton);

        await waitFor(() => { expect(screen.getByText('Wrong credentials').textContent).toEqual('Wrong credentials') });

        userEvent.click(screen.getByText('OK'));

        await waitFor(() => { expect(screen.queryByText('Wrong credentials')).not.toBeInTheDocument(); });
    });

});