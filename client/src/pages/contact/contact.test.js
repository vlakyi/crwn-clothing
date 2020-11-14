import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactPage from './contact.component';
import {reducer} from './contact.component';

describe('Contact page test', () => {
    beforeEach(() => {
        render(<ContactPage/>);
    });

    afterEach(cleanup);

    it('render Contact page component ', () => {
        expect(screen.getByText('Connect with us.')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        screen.debug();
    });

    it('render ContactPage and check filling inputs functionality', async () => {
        const nameInput = screen.getByLabelText('Name');
        const emailInput = screen.getByLabelText('Email');
        const messageTextArea = screen.getByLabelText('Message');

        expect(nameInput.getAttribute('name')).toEqual('name');
        expect(emailInput.getAttribute('name')).toEqual('email');
        expect(messageTextArea.getAttribute('name')).toEqual('message');
        
        await userEvent.type(nameInput, 'TestUser');
        expect(nameInput.value).toEqual('TestUser');

        await userEvent.type(emailInput, 'email@gmail.com');
        expect(emailInput.value).toEqual('email@gmail.com');

        await userEvent.type(messageTextArea, 'JavaScript');
        expect(messageTextArea.value).toEqual('JavaScript');
    });

    it('check useReducer functionality', () => {
        
    });
});