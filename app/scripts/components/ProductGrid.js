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
            id={product.id}
            color={product.color}/>
  }

  render() {
    return <div className="product-grid row">
              <VirtualList className="clearfix" items={this.props.products} itemsPerRow="3" renderItem={this.ProductItem} itemHeight="270"/>
            </div>
  }
}

