import IProduct from "./IProduct";

type basic_type = {
  id: string;
  name: string;
}

type filter_type = basic_type & {
  type: string;
}

type path_from_root = [basic_type] 

type filters_values = basic_type & path_from_root;

type available_filters_values = basic_type & {
  results: number;
}

type filters = filter_type & {
  values: [filters_values]
};

type available_filters = filter_type & {
  values: [available_filters_values]
}

interface ISearch {
  site_id: string;
  country_default_time_zone: string;
  paging: {
    total: number;
    primary_results: number;
    offset: number;
    limit: number;
  };
  results: [IProduct]
  sort: {
    id: "relevance";
    name: "Mais relevantes";
  };
  available_sorts: [
    {
      id: "price_asc";
      name: "Menor preço";
    },
    {
      id: "price_desc";
      name: "Maior preço";
    }
  ];
  filters: [filters];
  available_filters: [available_filters];
}

export default ISearch;
