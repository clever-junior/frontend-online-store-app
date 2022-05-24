import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
  render() {
    const { thumbnail, name, price } = this.props;
    return (
      <div data-testid="product">
        <p>{name}</p>
        <img src={ thumbnail } alt={ name } />
        <p>{price}</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
