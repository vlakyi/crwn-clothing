import { createSelector } from 'reselect';

const selectShop = state => state.shop;

const selectUrlCollectionType = (state, props) => props.match.params.collectionType;   // passing props as second argument to get PageUrl

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.values(collections) : []
)

export const selectCollection = createSelector(
    [selectCollections, selectUrlCollectionType],
    (collections, collectionType) => {
        return collections[collectionType]
    }
);

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections                          // converting to boolean value
);
