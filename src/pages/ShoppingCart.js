import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  render() {
    const cartItems = JSON.parse(localStorage.getItem('itensDoCarrinho'));
    return (
      <div>
        { (!cartItems)
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (
            <div>
              {cartItems.map((item) => (
                <div key={ item.id }>
                  <p data-testid="shopping-cart-product-name">
                    { item.name }
                  </p>
                  <p>
                    { item.price }
                  </p>
                  <p data-testid="shopping-cart-product-quantity">
                    { item.quantidade }
                  </p>
                </div>
              ))}
            </div>
          )}
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default ShoppingCart;
