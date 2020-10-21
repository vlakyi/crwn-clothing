import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { withRouter } from 'react-router-dom';

import {CartDropdownContainer, CartItems, EmptyMessage} from './cart-dropdown.styles';

// Redux
import { connect } from 'react-redux';
// Reselect (Memoizing for Redux for better performance )
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <CartDropdownContainer>
        <CartItems>
            {
                cartItems.length ?
                    cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
                    :
                    <EmptyMessage>Your cart is empty</EmptyMessage>
            }
        </CartItems>
        <CustomButton onClick={() => {
            history.push('/checkout');
            // We can use dispatch function instead of creating mapDispatchToProps function, because
            // connect is passing dispatch function prop inside our component
            dispatch(toggleCartHidden());
        }}>GO TO CHECKOUT</CustomButton>
    </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));