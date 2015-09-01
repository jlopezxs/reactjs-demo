/*
 * Module dependencies
 */

import React from 'react';

export default class ProductContent extends React.Component {
  render() {
    return <div className="product-content">
              <p>{this.props.name}</p>
              <span className="product-id">{this.props.id} </span>
              <span className="product-price">{this.props.price}$</span>
            </div>
  }
}