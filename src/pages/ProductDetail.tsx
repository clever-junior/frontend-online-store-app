import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewStars from '../components/ReviewStars';
import Stars from '../components/Stars';
import { getProduct } from '../services/api';
import IProduct from '../interfaces/IProduct';
import Loading from '../components/Loading';
import ProductCard2 from './ProductDetail2';
import { addToCart } from '../utils/cart';
import { AppContext } from '../store/contexts/AppContext';

function ProductDetail() {
  const { id } = useParams();
  const { setCartSize } = useContext(AppContext);
  const [product, setProduct] = useState<IProduct>();
  const [starRating, setStarRating] = useState(0);
  const [productReview, setProductReview] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const getProductFromAPI = async () => (
      id && setProduct(await getProduct(id))
    );

    getProductFromAPI();
  }, [id]);

  const saveStarRating = (starRating) => setStarRating(starRating)

  const saveReview = () => {
    const newReview = {
      userEmail,
      productReview,
      starRating,
    };

    if (!JSON.parse(localStorage.getItem('productsReviews'))) {
      localStorage.setItem('productsReviews', JSON.stringify({}));
    }

    const previousReviews = JSON.parse(localStorage.getItem('productsReviews'));

    if (Object.keys(previousReviews).some((el) => el === id)) {
      previousReviews[id] = [...previousReviews[id], newReview];
    } else {
      previousReviews[id] = [newReview];
    }
    localStorage.setItem('productsReviews', JSON.stringify(previousReviews));

    setUserEmail('');
    setProductReview('');
    setStarRating(0);
  }

  if (!JSON.parse(localStorage.getItem('productsReviews'))) {
    localStorage.setItem('productsReviews', JSON.stringify({}));
  }
  const listOfReviews = JSON.parse(localStorage.getItem('productsReviews'));

  return (
    <>
      {/* <ProductCard2 /> */}
      {
        product ? (
          <div>
            <div>
              <h2
                data-testid="product-detail-name"
              >
                {product.title}
                {product.shipping.free_shipping
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
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <h4>Garantia</h4>
                {/* <p>{warranty}</p> */}
              </div>
              <button
                id={product.id}
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={() => addToCart(product, setCartSize)}
              >
                Adicionar ao carrinho
              </button>
            </div>
            <div>
              <form>
                <input
                  type="email"
                  name="userEmail"
                  value={userEmail}
                  placeholder="Digite seu e-mail"
                  onChange={({ target: { value } }) => setUserEmail(value)}
                  data-testid="product-detail-email"
                />
                <Stars saveStarRating={saveStarRating} />
                <textarea
                  data-testid="product-detail-evaluation"
                  name="productReview"
                  value={productReview}
                  onChange={({ target: { value } }) => setProductReview(value)}
                />
                <button
                  onClick={saveReview}
                  type="button"
                  data-testid="submit-review-btn"
                >
                  Avaliar
                </button>
              </form>
            </div>
            <div>
              {listOfReviews[id] && listOfReviews[id].map((review, index) => (
                <div key={index}>
                  <p>{review.userEmail}</p>
                  <ReviewStars rating={review.starRating} />
                  <p>{review.productReview}</p>
                </div>
              ))}
            </div>
          </div>) : <Loading />
      }
    </>
  );
}

export default ProductDetail;
