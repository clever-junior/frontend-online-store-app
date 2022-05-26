import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

class ProductDetail extends React.Component {
  state = {
    product: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProducts(id);
    this.setState({ product });
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
    const { product, product: { warranty } } = this.state;
    return (
      <div>
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
        >
          Ir Para o carrinho
        </Link>
        <h2
          data-testid="product-detail-name"
        >
          { product.title }
        </h2>
        <h2>
          R$
          {product.price}
        </h2>
        <img src={ product.thumbnail } alt={ product.title } />
        <div>
          <h4>Garantia</h4>
          <p>{warranty}</p>
        </div>
        <button
          id={ product.id }
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.addToCart }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetail;
