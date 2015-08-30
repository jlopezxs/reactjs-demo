/*
 * Module dependencies
 */

import React from 'react';

export default class ProductFilter extends React.Component {
  onChange(event) {
    this.props.filterProducts(event);
  }

  render() {
    return <input
            type="text"
            className="search"
            onChange={ this.onChange.bind(this) }
            placeholder="Search" />
  }
}
