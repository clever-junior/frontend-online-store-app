import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

class ShoppingCart extends Component {
  render() {
    const itemsDoCarrinho = JSON.parse(localStorage.getItem('itensDoCarrinho'));
    return (
      <div>
        { itemsDoCarrinho
          ? itemsDoCarrinho.map((item) => (
            <div key={ item.id }>
              <ProductCard
                thumbnail={ item.thumbnail }
                price={ item.price }
                name={ item.name }
                testID="shopping-cart-product-name"
              />
              <p data-testid="shopping-cart-product-quantity">{ item.quantidade }</p>
            </div>
          ))
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default ShoppingCart;
