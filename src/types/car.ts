export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export type CarBrandList = string[];

export interface PaginatedCars {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
  nextPage?: number;
}

export type Filters = {
  brand?: string;
  price?: string;
  mileageFrom?: number;
  mileageTo?: number;
};
