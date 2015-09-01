/*
 * Module dependencies
 */

import React from 'react';
import ProductImage from './ProductImage';
import ProductContent from './ProductContent';

export default class ProductItem extends React.Component {
  render() {

    return <div className="col-33" >
                <div className="product-item">
                  <ProductImage id={this.props.id} color={this.props.color} />
                  <ProductContent id={this.props.id}
                                  name={this.props.name} 
                                  price={this.props.price} 
                                  stock={this.props.stock}/>
                </div>
            </div>
  }
}
