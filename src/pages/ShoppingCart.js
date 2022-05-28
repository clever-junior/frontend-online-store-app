import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { AsyncStorage } from 'react-native';

class ShoppingCart extends Component {
  state = {
    productsList: [],
  }

  componentDidMount() {
    const productsList = JSON.parse(localStorage.getItem('itensDoCarrinho'));
    this.setState({ productsList });
  }

  handleClick = ({ target }) => {
    const { name, id } = target;
    const productsList = JSON.parse(localStorage.getItem('itensDoCarrinho'));
    const selectedProduct = productsList.find((product) => product.id === id);
    if (name === 'minus') {
      if (selectedProduct.quantidade === 1) {
        selectedProduct.quantidade = 1;
      } else {
        selectedProduct.quantidade -= 1;
      }
    } else {
      selectedProduct.quantidade += 1;
    }
    const index = productsList
      .indexOf(productsList.find((element) => element.id === id));

    productsList.splice(index, 1, selectedProduct);
    this.setState({ productsList });
    localStorage.setItem('itensDoCarrinho', JSON.stringify(productsList));
  }

  render() {
    const { productsList } = this.state;
    // const productsList = JSON.parse(localStorage.getItem('itensDoCarrinho'));
    console.log(productsList);
    return (
      <div>
        { !productsList
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (
            <div>
              {productsList.map((item) => (
                <div key={ item.id }>
                  <div>
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
                  <div>
                    <button
                      data-testid="product-decrease-quantity"
                      type="button"
                      id={ item.id }
                      name="minus"
                      onClick={ this.handleClick }
                    >
                      -
                    </button>
                    <button
                      data-testid="product-increase-quantity"
                      type="button"
                      id={ item.id }
                      name="add"
                      onClick={ this.handleClick }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        <Link to="/">Home</Link>
        <br />
        <Link to="/checkout" data-testid="checkout-products">Finalizar Compra </Link>
      </div>
    );
  }
}

export default ShoppingCart;
