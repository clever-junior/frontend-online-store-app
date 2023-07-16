import { FC, ReactNode, useEffect, useState } from "react";
import { AppContext, AppContextValue } from "../contexts/AppContext";
import IProduct, { ICartProduct } from "../../interfaces/IProduct";
import { CART_KEY } from "../../utils/constants";
import getLocalStorage from "../../utils/localStorage";

interface Props {
  children: ReactNode;
}

const Provider: FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cartSize, setCartSize] = useState(0);

  const size: number = localStorage
    .getItem(CART_KEY) ? JSON
      .parse(localStorage.getItem(CART_KEY) || '')
      .reduce((accumulator: number, element: ICartProduct) => {
        accumulator += element.quantity;
        return accumulator;
      }, 0) : 0;

  useEffect(() => setCartSize(size), []);

  const updateCartSize = () => setCartSize(cartSize);

  // const addProductToCart = (product: IProduct) => {
  //   const cartProduct: ICartProduct = {
  //     ...product,
  //     quantity: 1,
  //   };

  //   const currentProduct = getLocalStorage.verifyProducts(cartProduct);

  //   let cartProductsList = getLocalStorage.parsedProducts();


  // }

  const contextValue: AppContextValue = {
    ...AppContext,
    products,
    setProducts,
    cartSize,
    setCartSize,
    updateCartSize
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export default Provider;