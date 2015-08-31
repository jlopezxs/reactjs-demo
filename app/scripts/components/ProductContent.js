/*
 * Module dependencies
 */

import React from 'react';

export default class ProductContent extends React.Component {
  render() {
    let style =`background-color: ${this.props.color}`;
    let colorStyle ={
      backgroundColor:this.props.color
    }
    
    return <div className="product-content">
              <p>{this.props.name}</p>
              <span className="product-price">{this.props.id} - {this.props.price}$</span>
              <span className="product-color" style={colorStyle}></span>
            </div>
  }
}