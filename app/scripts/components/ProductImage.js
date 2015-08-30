/*
 * Module dependencies
 */

import React from 'react';

export default class ProductImage extends React.Component {
  render() {
    var url =`http://placehold.it/350x150`;

    return <div className="product-image">
      <img src={url} className="image" />
    </div>
  }
}