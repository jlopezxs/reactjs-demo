/*
 * Module dependencies
 */

import React from 'react';
import ProductItem from './ProductItem';
import VirtualList from 'react-virtual-list';

export default class ProductGrid extends React.Component {
  ProductItem(product){
    return <ProductItem
            key={product.id}
            name={product.name} 
            price={product.price} 
            stock={product.stock} 
            id={product.id} />
  }

  render() {
    return <div className="product-grid row">
      <VirtualList items={this.props.products} renderItem={this.ProductItem} itemHeight="50"/>
    </div>
  }
}

