import React from 'react';

import SHOP_DATA from './ShopData';
import CollectionPreview from '../../components/collection-preview/CollectionPreview';

import './ShopPage.scss';

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    // we can pass our data here
    this.state = {
      // An array contains objects for different types of product
      collections: SHOP_DATA
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div className="shop-page">
        {collections.map(({ id, ...otherCollectionFields }) => (
          <CollectionPreview key={id} {...otherCollectionFields} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
