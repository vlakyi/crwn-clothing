import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { useHistory } from 'react-router-dom';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Reselect (Memoizing for Redux for better performance )
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropdown = React.forwardRef((props, ref) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    return (
        <CartDropdownContainer ref={ref}>
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
                dispatch(toggleCartHidden());
            }}>GO TO CHECKOUT</CustomButton>
        </CartDropdownContainer>
    )
});

export default CartDropdown;