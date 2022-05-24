export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const result = await fetch(URL);
  const response = await result.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  const result = await fetch(URL);
  const response = await result.json();
  return response;
}
