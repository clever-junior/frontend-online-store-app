import { Link } from 'react-router-dom';
import IProduct from '../interfaces/IProduct';

interface ProductCardProps {
  product: IProduct,
  onClick: (product: IProduct) => void,
}

function ProductCard({ product, onClick }: ProductCardProps) {
    const { thumbnail, title: name, price, id, shipping: { free_shipping: freeShipping } } = product;

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
          onClick={ () => onClick(product) }
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

export default ProductCard;
