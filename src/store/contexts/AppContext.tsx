import { createContext } from "react";
import IProduct from "../../interfaces/IProduct";

export type AppContextValue = {
  products?: IProduct[],
  setProducts?: (newValue: IProduct[]) => void,
  cartSize?: number,
  setCartSize?: (newValue: number) => void,
}

const initialContextValue: AppContextValue = {
  products: [],
  setProducts: () => { },
  cartSize: 0,
  setCartSize: () => { },
}

export const AppContext = createContext<AppContextValue>(initialContextValue);
