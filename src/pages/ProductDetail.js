import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProduct } from '../services/api';
import Stars from '../components/Stars';
import ReviewStars from '../components/ReviewStars';

class ProductDetail extends React.Component {
  state = {
    product: [],
    userEmail: '',
    productReview: '',
    starRating: 0,
    pageId: '',
    cartSize: 0,
    freeShipping: false,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProduct(id);
    this.setState({
      product,
      pageId: id,
      freeShipping: product.shipping.free_shipping,
    });
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

  addToCart = async (item) => {
    const product = {
      name: item.title,
      id: item.id,
      thumbnail: item.thumbnail,
      price: item.price,
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
    this.updateCartSize();
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

  saveStarRating = (starRating) => {
    this.setState({ starRating });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  saveReview = () => {
    const { userEmail, productReview, starRating, pageId } = this.state;
    const newReview = {
      userEmail,
      productReview,
      starRating,
    };

    if (!JSON.parse(localStorage.getItem('productsReviews'))) {
      localStorage.setItem('productsReviews', JSON.stringify({}));
    }

    const previousReviews = JSON.parse(localStorage.getItem('productsReviews'));

    if (Object.keys(previousReviews).some((el) => el === pageId)) {
      previousReviews[pageId] = [...previousReviews[pageId], newReview];
    } else {
      previousReviews[pageId] = [newReview];
    }
    localStorage.setItem('productsReviews', JSON.stringify(previousReviews));
    this.setState({
      userEmail: '',
      productReview: '',
      starRating: 0,
    });
  }

  render() {
    const { product, product: { warranty }, userEmail, productReview,
      cartSize, freeShipping } = this.state;
    const { match: { params: { id } } } = this.props;
    if (!JSON.parse(localStorage.getItem('productsReviews'))) {
      localStorage.setItem('productsReviews', JSON.stringify({}));
    }
    const listOfReviews = JSON.parse(localStorage.getItem('productsReviews'));
    return (
      <div>
        <div>
          <Link
            to="/shopping-cart"
            data-testid="shopping-cart-button"
          >
            Ir Para o carrinho -
            <span data-testid="shopping-cart-size">{cartSize}</span>
          </Link>
          <h2
            data-testid="product-detail-name"
          >
            { product.title }
            {freeShipping
            && (
              <span
                data-testid="free-shipping"
              >
                - Frete Grátis
              </span>
            )}
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
            onClick={ () => this.addToCart(product) }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <div>
          <form>
            <input
              type="email"
              name="userEmail"
              value={ userEmail }
              placeholder="Digite seu e-mail"
              onChange={ this.handleChange }
              data-testid="product-detail-email"
            />
            <Stars saveStarRating={ this.saveStarRating } />
            <textarea
              data-testid="product-detail-evaluation"
              name="productReview"
              value={ productReview }
              onChange={ this.handleChange }
            />
            <button
              onClick={ this.saveReview }
              type="button"
              data-testid="submit-review-btn"
            >
              Avaliar
            </button>
          </form>
        </div>
        <div>
          {listOfReviews[id] && listOfReviews[id].map((review, index) => (
            <div key={ index }>
              <p>{review.userEmail}</p>
              <ReviewStars rating={ review.starRating } />
              <p>{review.productReview}</p>
            </div>
          ))}
        </div>
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
