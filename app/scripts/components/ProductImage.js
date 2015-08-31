/*
 * Module dependencies
 */

import React from 'react';

export default class ProductImage extends React.Component {
  render() {
    //let url =`http://placehold.it/220x220`;
    let url =`http://es.prepro.privalia-test.com/front/get/photo/139840_-_images_-_products_-_BAW1318-ANIS_-_ab1.jpg`;

    return <div className="product-image">
              <img src={url} className="image" />
            </div>
  }
}