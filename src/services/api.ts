import IProduct from "../interfaces/IProduct";
import ISearch from "../interfaces/ISearch";

export async function getCategories() {
  const URL = "https://api.mercadolibre.com/sites/MLB/categories";
  const result = await fetch(URL);
  const response = await result.json();
  return response;
}

export async function getProductsFromCategoryAndQuery({
  categoryId,
  query,
}: {
  categoryId: string;
  query: string;
}): Promise<ISearch> {
  let url = "";

  if (categoryId && query)
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  if (categoryId && !query)
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  if (!categoryId && query)
    url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  const response = await fetch(url);

  const promise = await response.json();

  return promise;
}

export async function getProduct(PRODUCT_ID: string): Promise<IProduct> {
  const URL = `https://api.mercadolibre.com/items/${PRODUCT_ID}`;

  const response = await fetch(URL);

  const promise: IProduct = await response.json();

  return promise;
}
