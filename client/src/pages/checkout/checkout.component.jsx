import React from 'react';

// Redux and Reselect
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CartActionTypes from '../../redux/cart/cart.types';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { CheckoutPageContainer, CheckoutHeaderContainer, CheckoutHeader, CheckoutTotal, TestWarning, DeleteButton } from './checkout.styles';

const CheckoutPage = () => {
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const dispatch = useDispatch();
    return (
        <CheckoutPageContainer>
            <CheckoutHeaderContainer>
                <CheckoutHeader>CART</CheckoutHeader>
                <DeleteButton style={{ fontSize: 32 }} onClick={() => dispatch({ type: CartActionTypes.CLEAR_CART })} />
            </CheckoutHeaderContainer>
            {
                cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
            }

            <CheckoutTotal> TOTAL: ${total.toFixed(2)} </CheckoutTotal>

            <TestWarning>
                *Please use the following test credit card for payments*
            <p>4242 4242 4242 4242 - Exp: 01/28 - CVV: 123</p>
            </TestWarning>

            <StripeCheckoutButton price={total} />

        </CheckoutPageContainer>
    )
};

export default CheckoutPage;