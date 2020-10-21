import React from 'react';

// Redux and Reselect
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { CheckoutPageContainer, CheckoutHeader, CheckoutHeaderBlock, CheckoutTotal, TestWarning } from './checkout.styles';

const CheckoutPage = ({ cartItems, total }) => (
    <CheckoutPageContainer>
        <CheckoutHeader>

            <CheckoutHeaderBlock>
                <span>Product</span>
            </CheckoutHeaderBlock>

            <CheckoutHeaderBlock>
                <span>Descripton</span>
            </CheckoutHeaderBlock>

            <CheckoutHeaderBlock>
                <span>Quantity</span>
            </CheckoutHeaderBlock>

            <CheckoutHeaderBlock>
                <span>Price</span>
            </CheckoutHeaderBlock>

            <CheckoutHeaderBlock>
                <span>Remove</span>
            </CheckoutHeaderBlock>

        </CheckoutHeader>
        {
            cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
        }

        <CheckoutTotal>
            <span>TOTAL: ${total}</span>
        </CheckoutTotal>

        <TestWarning>
            *Please use the following test credit card for payments*
            <p>4242 4242 4242 4242 - Exp: 01/28 - CVV: 123</p>
        </TestWarning>

        <StripeCheckoutButton price={total} />

    </CheckoutPageContainer>
);


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);