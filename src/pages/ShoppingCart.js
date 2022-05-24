import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  render() {
    return (
      <div>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default ShoppingCart;
