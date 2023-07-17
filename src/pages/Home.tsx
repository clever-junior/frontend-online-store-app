import { useContext } from 'react';
import { AppContext, AppContextValue } from '../store/contexts/AppContext';
import ProductsList from '../components/ProductsList';

const CHUNK_SIZE = 4;

export const Home = () => {
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
      </div>
    </main>
  )
}