import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import CartActionTypes from '../../redux/cart/cart.types';

// Reselect (Memoizing for Redux for better performance )
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

// Styled Components
import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon = React.forwardRef(({ style }, ref) => {
    const dispatch = useDispatch();
    const itemCount = useSelector(selectCartItemsCount);

    return (
        <CartIconContainer ref={ref} style={style} onClick={() => dispatch({type: CartActionTypes.TOGGLE_CART_HIDDEN})}>
            <ShoppingIcon />
            <ItemCount>{itemCount}</ItemCount>
        </CartIconContainer>
    )
});

export default CartIcon;