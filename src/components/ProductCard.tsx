import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  render() {
    const { thumbnail, name, price, addToCart, id, freeShipping } = this.props;
    return (
      <div data-testid="product">
        <p>
          {name}
          {freeShipping && <span data-testid="free-shipping"> - Frete Grátis</span>}
        </p>
        <img src={ thumbnail } alt={ name } />
        <p>{price}</p>
        <button
          id={ id }
          type="button"
          onClick={ (e) => addToCart(e) }
          data-testid="product-add-to-cart"
        >
          adicionar a carrinho
        </button>
        <Link
          data-testid="product-detail-link"
          to={ `/product-detail/${id}` }
        >
          Mais detalhes
        </Link>
      </div>
    );
  }
}

// ProductCard.propTypes = {
//   thumbnail: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   id: PropTypes.string.isRequired,
//   addToCart: PropTypes.func.isRequired,
//   freeShipping: PropTypes.bool.isRequired,
// };

export default ProductCard;
