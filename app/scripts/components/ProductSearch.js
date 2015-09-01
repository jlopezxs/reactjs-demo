import React from 'react';
import products from '../api/products';
import ProductFilter from './ProductFilter';
import ProductItem from './ProductItem';
import VirtualGrid from './VirtualGrid';

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
    event.preventDefault();
    const regex = new RegExp(event.target.value, 'i');
    const filtered = this.state.products.filter(function(item) {
      return (item.name.search(regex) > -1);
    });

    this.setState({
      filteredProducts: filtered,
    });
  }

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
    if (this.state.products.length) {
      return (
        <div className="container">
          <h1 className="title">React Demo { this.state.filteredProducts.length } products</h1>
          <ProductFilter filterProducts={ this.filterProducts.bind(this) } />
          <VirtualGrid className="clearfix row" 
                      items={this.state.filteredProducts} 
                      columns="3" 
                      renderItem={this.ProductItem} 
                      itemHeight="258"
                      buffer="3"/>
        </div>
      );
    } else {
      return <p>Cargando...</p>
    }
  }
}
