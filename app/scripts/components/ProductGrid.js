/*
 * Module dependencies
 */

import React from 'react';
import ProductItem from './ProductItem';
import VirtualGrid from './VirtualGrid';

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
              <VirtualGrid className="clearfix" 
                          items={this.props.products} 
                          columns="3" 
                          renderItem={this.ProductItem} 
                          itemHeight="258"
                          buffer="3"/>
            </div>
  }
}

