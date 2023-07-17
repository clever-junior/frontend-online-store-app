import { FC, ReactNode, useEffect, useState } from "react";
import { AppContext, AppContextValue } from "../contexts/AppContext";
import IProduct  from "../../interfaces/IProduct";

interface Props { children: ReactNode }

const Provider: FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cartSize, setCartSize] = useState(0);

  useEffect(() => setCartSize(cartSize), [cartSize]);

  const contextValue: AppContextValue = {
    ...AppContext,
    products,
    setProducts,
    cartSize,
    setCartSize,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export default Provider;