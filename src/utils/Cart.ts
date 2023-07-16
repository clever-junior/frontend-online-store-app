import IProduct, { ICartProduct } from "../interfaces/IProduct";
import { CART_KEY } from "./constants";
import { getItem, getParsedItem, setItem } from "./localStorage";

const verifyCartProduct = (cartProduct: ICartProduct) => {
  if (!getItem(CART_KEY)) {
    setItem(CART_KEY);
  }

  const storage = getParsedItem<ICartProduct[]>(CART_KEY);

  const currentProduct = storage.find(({ id }) => id === cartProduct.id);

  if (currentProduct) {
    currentProduct.quantity += 1;
    return currentProduct;
  }

  return cartProduct;
};

export const addToCart = (product: IProduct, updateCartSize: () => void) => {
  const cartProduct: ICartProduct = {
    ...product,
    quantity: 1,
  };

  const localStorageCartProducts: ICartProduct = verifyCartProduct(cartProduct);

  let cartProductsList: ICartProduct[] = getParsedItem(CART_KEY);

  if (
    cartProductsList.some(
      (currentProduct) => currentProduct.id === localStorageCartProducts.id
    )
  ) {
    const product = cartProductsList.find((currentProduct) => (
      currentProduct.id === localStorageCartProducts.id)) ;

    const index = product ? cartProductsList.indexOf(product) : -1;

    cartProductsList.splice(index, 1, localStorageCartProducts);
  } else {
    cartProductsList = [...cartProductsList, localStorageCartProducts];
  }

  setItem(CART_KEY, cartProductsList);

  updateCartSize && updateCartSize();
};
