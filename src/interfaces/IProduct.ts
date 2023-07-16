type state = {
  id: string;
  name: string
}

type city = {
  id: string;
  name: string
}

type country = {
  id: string;
  name: string
}

type seller_address = {
  comment: string;
  address_line: string;
  id: null;
  latitude: null;
  longitude: null;
  country: country
  state: state;
  city: city;
}

type address = {
  state_id: string;
  state_name: string;
  city_id: string;
  city_name: string;
}

type attributes = [
  {
      id: string;
      name: string;
      value_id: null;
      value_name: string;
      attribute_group_id: string;
      attribute_group_name: string;
      value_struct: null;
      values: [
          {
              id: null;
              name: string;
              struct: null;
              source: number
          }
      ];
      source: number;
      value_type: string
}]

type installments = {
  quantity: number;
  amount: number;
  rate: number;
  currency_id: string;
}

type seller = {
  id: number;
  nickname: string;
  car_dealer: boolean;
  real_estate_agency: boolean;
  _: boolean;
  registration_date: string;
  tags: [string];
  car_dealer_logo: string;
  permalink: string;
  seller_reputation: {
      level_id: string;
      power_seller_status: string;
      transactions: {
          canceled: number;
          completed: number;
          period: string;
          ratings: {
              negative: number;
              neutral: number;
              positive: number
          };
          total: number
      };
      metrics: {
          sales: {
              period: string;
              completed: number
          };
          claims: {
              period: string;
              rate: number;
              value: number
          };
          delayed_handling_time: {
              period: string;
              rate: number;
              value: number
          };
          cancellations: {
              period: string;
              rate: number;
              value: number
          }
      }
  };
  eshop: {
      eshop_id: number;
      seller: number;
      nick_name: string;
      eshop_status_id: number;
      site_id: string;
      eshop_experience: number;
      eshop_rubro: null;
      eshop_locations: [];
      eshop_logo_url: string
  }
};

type shipping = {
  store_pick_up: boolean;
  free_shipping: boolean;
  logistic_type: string;
  mode: string;
  tags: [string];
  benefits: null;
  promise: null
};

interface IProduct {
  id: string;
  title: string;
  condition: string;
  thumbnail_id: string;
  catalog_product_id: string | null;
  listing_type_id: string;
  permalink: string;
  buying_mode: string;
  site_id: string;
  category_id: string;
  domain_id: string;
  thumbnail: string;
  currency_id:  string;
  order_backend: number;
  price: number;
  original_price: number;
  sale_price: number | null;
  sold_quantity: number;
  available_quantity: number;
  official_store_id: number;
  official_store_name: string;
  use_thumbnail_id: boolean;
  accepts_mercadopago: boolean;
  tags: [string];
  shipping: shipping
  stop_time: string;
  seller: seller
  seller_address: seller_address;
  address: address;
  attributes: attributes;
  installments: installments
  winner_item_id?: null;
  discounts?: null;
  promotions?: [];
  inventory_id?: null;
}

export interface ICartProduct extends IProduct {
  quantity: number;
}

export default IProduct;