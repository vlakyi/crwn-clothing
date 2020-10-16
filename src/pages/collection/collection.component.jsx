import React from 'react';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { CollectionPageContainer, ItemsContainer, CollectionHeader } from './collection.styles';

const CollectionPage = ({ collection }) => {
    console.log(collection);
    const { title, items } = collection;
    console.log(items);
    return (
        <CollectionPageContainer>
            <CollectionHeader>{title}</CollectionHeader>
            <ItemsContainer>
                {
                    items.map(item => <CollectionItem key={item.id} item={item} />)
                }
            </ItemsContainer>
        </CollectionPageContainer>
    )
};

const mapStateToProps = (state, props) => {
    return ({
        collection: selectCollection(state, props)
    })
};

export default connect(mapStateToProps)(CollectionPage);