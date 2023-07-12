import { Route, Routes } from "react-router-dom";
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import ShoppingCart from './pages/ShoppingCart';
import Home from './pages/home';

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
