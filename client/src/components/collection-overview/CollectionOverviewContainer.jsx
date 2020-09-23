import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/ShopSelector';
import WithSpinner from '../with-spinner/WithSpinner';
import CollectionOverview from './CollectionOverview';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

// So the new wrapped component with spinner will have isLoading as one of the props,
// and WithSpinner will determine the actual spinner logic based on this prop.
const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;