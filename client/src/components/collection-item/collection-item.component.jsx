import React from 'react';

import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

import {CollectionItemContainer, BackgroundImage, CollectionFooterContainer, NameContainer, PriceContainer, AddButton} from './collection-item.styles';
const CollectionItem = ({ item, addItem }) => {
    const { imageUrl, name, price } = item;

    return (
        <CollectionItemContainer>
            <AddButton onClick={() => addItem(item)}></AddButton>
            <BackgroundImage imageUrl={imageUrl}/>
            <CollectionFooterContainer>
                <NameContainer>{name}</NameContainer>
                <PriceContainer>${price.toFixed(2)}</PriceContainer>
            </CollectionFooterContainer>
        </CollectionItemContainer>
    )
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);