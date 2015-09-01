/*
 * Module dependencies
 */

import React from 'react';

export default class ProductImage extends React.Component {
  render() {
    //let url =`../images/placehold.png`;
    const colorStyle = {
      backgroundColor: this.props.color,
      width: '100%',
      height: '242px'
    }

    return <div className="product-image" style={colorStyle}>
       
            </div>
  }
}