import React from 'react';
import ProductSearch from './components/ProductSearch';

window.React = React;
const mountNode = document.getElementById('app');

React.render(<ProductSearch/>, mountNode);
