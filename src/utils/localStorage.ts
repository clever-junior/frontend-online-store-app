import { ICartProduct } from "../interfaces/IProduct";

export const getItem = (key: string) => localStorage.getItem(key);

export const setItem = (key: string, replacer?: ICartProduct[]) => localStorage.setItem(key, JSON.stringify(replacer || []));

export const getParsedItem = <T>(key: string) => {
  return JSON.parse(
    localStorage.getItem(key) || ''
  ) as T;
}
