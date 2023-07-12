import Home from './pages/Home';
import {
  createBrowserRouter,
} from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'shopping-cart',
    element: <ShoppingCart />
  },
  {
    path: '/product-detail/:id',
    element: <ProductDetail />
  },
  {
    path: '/checkout',
    element: <Checkout />
  }
]);
