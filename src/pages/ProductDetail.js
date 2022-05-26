import React from 'react';
import PropTypes from 'prop-types';
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

  render() {
    const { product, product: { warranty } } = this.state;
    return (
      <div>
        <h2
          data-testid="product-detail-name"
        >
          {`${product.title} - R$ ${product.price}`}
        </h2>
        <img src={ product.thumbnail } alt={ product.title } />
        <div>
          <h4>Garantia</h4>
          <p>{warranty}</p>
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
