import React, { useRef, useEffect, useState } from 'react';
import Add from '@material-ui/icons/AddRounded';
import Remove from '@material-ui/icons/RemoveRounded';

import { throttle } from 'lodash';
import { connect } from 'react-redux';
import {
    clearItemFromCart,
    addItem,
    setItemQuantity,
    removeItem
} from '../../redux/cart/cart.actions';

import {
    CheckoutItemContainer,
    ImageContainer,
    CheckoutInfoWrapper,
    CheckoutInfoContainer,
    Name,
    QuantityContainer,
    Quantity,
    Price,
    RemoveButton
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem, clearItem, addItem, setItemQuantity, removeItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const imageRef = useRef();
    const [imageHeight, setImageHeight] = useState('');
    const [cartItemQuantity, setCartItemQuantity] = useState(quantity);

    const handleWindowResize = throttle(() => {
        setImageHeight(`${imageRef.current.offsetHeight}px`);
    }, 150);

    const handleQuantityChange = (e) => {
        setCartItemQuantity(e.target.value);
    };

    const handleInputBlur = (e) => {
        let quantity = e.target.value === '' ? 0 : parseInt(e.target.value);
        setItemQuantity({item: cartItem, quantity});
    }

    useEffect(() => {
        setCartItemQuantity(quantity);
    }, [quantity]);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, [handleWindowResize]);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img ref={imageRef} src={imageUrl} onLoad={handleWindowResize} alt="item" />
            </ImageContainer>

            <CheckoutInfoWrapper height={imageHeight}>
                <CheckoutInfoContainer>
                    <Name>{name}</Name>
                    <Price>${price.toFixed(2)}</Price>
                    <RemoveButton style={{ fontSize: 32 }} onClick={() => clearItem(cartItem)} />
                </CheckoutInfoContainer>

                <QuantityContainer>
                    <Add onClick={() => addItem(cartItem)} />
                    <Quantity
                        type="number"
                        value={cartItemQuantity}
                        onChange={handleQuantityChange}
                        onBlur={handleInputBlur}
                    />
                    <Remove onClick={() => removeItem(cartItem)} />
                </QuantityContainer>
            </CheckoutInfoWrapper>
        </CheckoutItemContainer>
    );
};

const mapDispatchToProps = (dispatch) => ({
    clearItem: (item) => dispatch(clearItemFromCart(item)),
    addItem: (item) => dispatch(addItem(item)),
    setItemQuantity: (itemAndQuantity) => dispatch(setItemQuantity(itemAndQuantity)),
    removeItem: (item) => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
