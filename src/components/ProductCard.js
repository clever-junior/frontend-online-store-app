import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  render() {
    const { thumbnail, name, price, id } = this.props;
    return (
      <div data-testid="product">
        <p>{name}</p>
        <img src={ thumbnail } alt={ name } />
        <p>{price}</p>
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

ProductCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProductCard;
