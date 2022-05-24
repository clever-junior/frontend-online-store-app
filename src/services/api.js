export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const result = await fetch(URL);
  const response = await result.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let url = '';
  if (categoryId && query) url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  if (categoryId && !query) url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  if (!categoryId && query) url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const result = await fetch(url);
  const response = await result.json();
  return response;
}
