import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    termoPesquisado: '',
    resultadoPesquisa: [],
    categorias: [],
  }

  async componentDidMount() {
    const categorias = await getCategories();
    this.setState({ categorias });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.checked ? target.id : target.value;
    this.setState({ [name]: value });
  }

  searchTerm = async (categoryId) => {
    const { termoPesquisado } = this.state;
    const resultadoPesquisa = await
    getProductsFromCategoryAndQuery(categoryId, termoPesquisado);
    this.setState({ resultadoPesquisa: resultadoPesquisa.results });
  }

  render() {
    const { termoPesquisado, resultadoPesquisa, categorias } = this.state;

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
              onClick={ this.searchTerm }
              data-testid="query-button"
            >
              Pesquisar
            </button>
            <div>
              {categorias.map((categoria) => (
                <Categories
                  key={ categoria.id }
                  id={ categoria.id }
                  name={ categoria.name }
                  searchTerm={ this.searchTerm }
                />
              ))}
            </div>
          </div>
          <div>
            {resultadoPesquisa
              ? resultadoPesquisa.map((item) => (
                <ProductCard
                  key={ item.id }
                  name={ item.title }
                  price={ item.price }
                  thumbnail={ item.thumbnail }
                  id={ item.id }
                />))
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
