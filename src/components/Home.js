import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    termoPesquisado: '',
    resultadoPesquisa: [],
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.checked ? target.checkd : target.value;
    this.setState({ [name]: value });
  }

  seachTerm = async () => {
    const { termoPesquisado } = this.state;
    const resultadoPesquisa = await
    getProductsFromCategoryAndQuery('livros', termoPesquisado);
    console.log(resultadoPesquisa);
    this.setState({ resultadoPesquisa: resultadoPesquisa.results });
  }

  render() {
    const { termoPesquisado, resultadoPesquisa } = this.state;

    return (
      <main>
        <div>
          <div className="search-container">
            <Link to="/shopping-cart" data-testid="shopping-cart-button">Carrinho</Link>
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            <input
              data-testid="query-input"
              type="text"
              name="termoPesquisado"
              value={ termoPesquisado }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              onClick={ this.seachTerm }
              data-testid="query-button"
            >
              Pesquisar
            </button>
          </div>
          <div>
            {resultadoPesquisa
              ? resultadoPesquisa.map((item) => (
                <div key={ item.id } data-testid="product">
                  <p>{item.title}</p>
                  <img src={ item.thumbnail } alt={ item.name } />
                  <p>{item.price}</p>
                </div>
              ))
              : (
                <p>Nenhum produto foi encontrado</p>
              )}
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
