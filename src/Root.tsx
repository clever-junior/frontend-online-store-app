import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
      <Route path="product-detail/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default Root;
