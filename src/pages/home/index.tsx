import { useContext } from 'react';
import { AppContext, AppContextValue } from '../../store/contexts/AppContext';
import ProductsList from '../../components/ProductsList';

const CHUNK_SIZE = 4;

function Home() {
  const { products }: AppContextValue = useContext(AppContext);

  const productsChunks = [];

  if (products) {
    for (let i = 0; i < products.length; i += CHUNK_SIZE) {
      productsChunks.push(products.slice(i, i + CHUNK_SIZE));
    }
  }

  return (
    <main>
      <div className='w-screen h-screen flex justify-center mt-4'>
        <div className='flex max-w-7xl flex-col'>
          {
            products && (productsChunks.map((productChunk, index) => (
              <ProductsList key={`chunk-${index}`} chunk={productChunk} />
            )))
          }
        </div>
        <div>
          {/* {
              products && products
                .map((product) => (
                  <ProductCard
                    product={product}
                    onClick={addToCart}
                    key={`card-${product.id}`}
                  />))
            } */}
        </div>
      </div>
    </main>
  )
}

export default Home;