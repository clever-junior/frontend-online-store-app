import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';

class Home extends React.Component {
  state = {
    termoPesquisado: '',
    idCategoriaPesquisada: '',
    resultadoPesquisa: [],
    categorias: [],
    cartSize: 0,
  }

  async componentDidMount() {
    const categorias = await getCategories();
    this.updateCartSize();
    this.setState({ categorias });
  }

  handleCategoryChange = (id) => {
    this.setState(
      { idCategoriaPesquisada: id, termoPesquisado: '' }, () => this.searchTerm(),
    );
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  searchTerm = async () => {
    const { termoPesquisado, idCategoriaPesquisada } = this.state;
    const resultadoPesquisa = await
    getProductsFromCategoryAndQuery(idCategoriaPesquisada, termoPesquisado);
    this.setState({ resultadoPesquisa: resultadoPesquisa.results });
  }

  addToCart = async (item) => {
    const product = {
      name: item.title,
      id: item.id,
      thumbnail: item.thumbnail,
      price: item.price,
      quantidade: 1,
      availableQuantity: item.available_quantity,
    };

    const resultLocalStorage = this.verifyLocalStorage(product);
    let productsList = JSON.parse(localStorage.getItem('itensDoCarrinho'));
    if (productsList.some((element) => element.id === resultLocalStorage.id)) {
      const index = productsList
        .indexOf(productsList.find((element) => element.id === resultLocalStorage.id));
      productsList.splice(index, 1, resultLocalStorage);
    } else {
      productsList = [...productsList, resultLocalStorage];
    }
    localStorage.setItem('itensDoCarrinho', JSON.stringify(productsList));
    this.updateCartSize();
  }

  updateCartSize = () => {
    const cartSize = localStorage
      .getItem('itensDoCarrinho')
      ? JSON.parse(localStorage.getItem('itensDoCarrinho')).reduce((acc, el) => {
        acc += el.quantidade;
        return acc;
      }, 0) : 0;
    this.setState({ cartSize });
  }

  verifyLocalStorage = (productObject) => {
    if (!localStorage.getItem('itensDoCarrinho')) {
      localStorage.setItem('itensDoCarrinho', JSON.stringify([]));
    }
    const initialStorage = JSON.parse(localStorage.getItem('itensDoCarrinho'));
    const produto = initialStorage.find((product) => product.id === productObject.id);
    if (produto) {
      produto.quantidade += 1;
      return produto;
    }
    return productObject;
  };

  render() {
    const { termoPesquisado, resultadoPesquisa, categorias, cartSize } = this.state;

    return (
      <main>
        <div>
          <div className="search-container">
            <Link
              to="/shopping-cart"
              data-testid="shopping-cart-button"
            >
              Carrinho -
              <span data-testid="shopping-cart-size">{ cartSize }</span>
            </Link>
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
                  onClick={ this.handleCategoryChange }
                />
              ))}
            </div>
          </div>
          <div>
            {resultadoPesquisa
              ? resultadoPesquisa.map((item) => (
                <ProductCard
                  key={ item.id }
                  id={ item.id }
                  name={ item.title }
                  price={ item.price }
                  thumbnail={ item.thumbnail }
                  freeShipping={ item.shipping.free_shipping }
                  addToCart={ () => this.addToCart(item) }
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
