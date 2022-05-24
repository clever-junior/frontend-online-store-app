import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <main>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">Carrinho</Link>
      </main>
    );
  }
}

export default Home;
