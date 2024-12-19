export type Cars = {
  availableFilters: AvailableFilters;
  items: Item[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type AvailableFilters = {
  year: Year[];
  city: CityElement[];
  brand: BrandElement[];
  model: Model[];
  version: BrandElement[];
};

export type BrandElement = {
  id: string;
  name: string;
};

export type CityElement = {
  id: CityEnum;
  name: CityEnum;
  slug: string;
};

export enum CityEnum {
  Campinas = "Campinas",
  Santos = "Santos",
  Sorocaba = "Sorocaba",
  SãoPaulo = "São Paulo",
  Uberlândia = "Uberlândia",
}

export type Model = {
  id: string;
  name: string;
  brand: BrandEnum;
};

export enum BrandEnum {
  Chevrolet = "CHEVROLET",
  Fiat = "FIAT",
  Renault = "RENAULT",
  Toyota = "TOYOTA",
  Volkswagen = "VOLKSWAGEN",
}

export type Year = {
  id: number;
  name: number;
};

export type Item = {
  id: number;
  city: CityEnum;
  year: number;
  brand: BrandEnum;
  model: string;
  version: string;
  price: number;
  mileage: number;
};

export type Filters = {
  label: string;
  name: string;
  data: BrandElement[] | Year[] | Model[] | CityElement[];
};
