import React from 'react';
import CollectionItem from '../collection-item/collection-item.component';

import { PreviewCollectionComponent, Title, Preview } from './collection-preview.styles';

const PreviewCollection = ({ title, items }) => (
    <PreviewCollectionComponent>
        <Title>{title.toUpperCase()}</Title>
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

export default PreviewCollection;