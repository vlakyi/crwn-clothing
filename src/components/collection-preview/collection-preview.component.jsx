import React from 'react';
import CollectionItem from '../collection-item/collection-item.component';
import { withRouter } from 'react-router-dom';

import { PreviewCollectionComponent, TitleLink, Preview } from './collection-preview.styles';

const PreviewCollection = ({ title, items, location }) => (
    <PreviewCollectionComponent>
        <TitleLink to={`${location.pathname}/${title.toLowerCase()}`}>{title.toUpperCase()}</TitleLink>
        <Preview>
            {
                items
                    .filter((_, id) => id < 4)
                    .map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))
            }
        </Preview>
    </PreviewCollectionComponent>
);

export default withRouter(PreviewCollection);