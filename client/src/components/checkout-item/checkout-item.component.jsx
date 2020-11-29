import React, { useRef, useEffect, useState } from 'react';
import Add from '@material-ui/icons/AddRounded';
import Remove from '@material-ui/icons/RemoveRounded';


import { connect } from 'react-redux';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';

import { CheckoutItemContainer, ImageContainer, CheckoutInfoWrapper, CheckoutInfoContainer, Name, QuantityContainer, Quantity, Price, RemoveButton } from './checkout-item.styles';
import { throttle } from 'lodash';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const imageRef = useRef();
    const [imageHeight, setImageHeight] = useState('');

    const handleWindowResize = throttle(() => {
        setImageHeight(imageRef.current.offsetHeight);
    }, 150);

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
                    <Quantity>{quantity}</Quantity>
                    <Remove onClick={() => removeItem(cartItem)} />
                </QuantityContainer>
            </CheckoutInfoWrapper>

        </CheckoutItemContainer>
    )
};

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);