import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import {
  getCategories,
  getProducts,
  getProductsFromCategoryAndQuery,
} from '../services/api';

class Home extends React.Component {
  state = {
    termoPesquisado: '',
    resultadoPesquisa: [],
    categorias: [],
    quantidade: 0,
  }

  async componentDidMount() {
    const categorias = await getCategories();
    const cartSize = localStorage
    .getItem('itensDoCarrinho')
    ? JSON.parse(localStorage.getItem('itensDoCarrinho')).length : 0;
  this.setState({ categorias, quantidade: cartSize });
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

  addToCart = async ({ target }) => {
    const result = await getProducts(target.id);
    const product = {
      name: result.title,
      id: result.id,
      thumbnail: result.thumbnail,
      price: result.price,
      quantidade: 1,
    };
    console.log(result);
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
    this.setState({ quantidade: productsList.length });
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
    const { termoPesquisado, resultadoPesquisa, categorias, quantidade } = this.state;

    return (
      <main>
        <div>
          <div className="search-container">
          <Link to="/shopping-cart" data-testid="shopping-cart-button" quantidade={ quantidade }>Carrinho {quantidade}</Link>
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
                  id={ item.id }
                  name={ item.title }
                  price={ item.price }
                  testID="product-add-to-cart"
                  thumbnail={ item.thumbnail }
                  addToCart={ this.addToCart }
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
