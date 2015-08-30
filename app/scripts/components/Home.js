import React from 'react';
import products from '../api/products';
import ProductGrid from './ProductGrid';
import ProductFilter from './ProductFilter';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      products: [],
      filteredProducts: []
    };
  }

  componentWillMount() {
    this.setState({ 
      products: products,
      filteredProducts: products
    });
  }

  filterProducts(event) {
    console.log(this);
    event.preventDefault();
    const regex = new RegExp(event.target.value, 'i');
    const filtered = this.state.products.filter(function(item) {
      return (item.name.search(regex) > -1);
    });

    this.setState({
      filteredProducts: filtered,
    });
  }

  render() {
    if (this.state.products.length) {
      return (
        <div className="container">
          <h1 className="title">React Demo</h1>
          <ProductFilter filterProducts={ this.filterProducts.bind(this) } />
          <ProductGrid products={ this.state.filteredProducts } />
        </div>
      );
    } else {
      return <p>Cargando...</p>
    }
  }
}
