import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';


import { selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import Collections from './collection.component';

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionLoaded(state)
});

// compose will currying all functions together from right to left (will call connect(mapStateToProps)(WithSpinner(CollectionOverview)))
const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(Collections);

export default CollectionPageContainer;