import axios from 'axios';
import type { Car, CarBrandList, Filters, PaginatedCars } from '../types/car';

const BASE_URL = 'https://car-rental-api.goit.global';

export const getCars = async (
  page: number,
  limit: number = 12,
  filters?: Filters
): Promise<PaginatedCars> => {
  const response = await axios.get(`${BASE_URL}/cars`, {
    params: {
      page,
      limit,
      brand: filters?.brand,
      mileageFrom: filters?.mileageFrom,
      mileageTo: filters?.mileageTo,
    },
  });

  const { cars, totalCars, totalPages, page: rawPage } = response.data;

  const currentPage =
    typeof rawPage === 'string' ? parseInt(rawPage, 10) : rawPage;

  const nextPage = currentPage < totalPages ? currentPage + 1 : undefined;

  return {
    cars,
    totalCars,
    page: currentPage,
    totalPages,
    nextPage,
  };
};

export const getCarById = async (id: string): Promise<Car> => {
  const response = await axios.get(`${BASE_URL}/cars/${id}`);
  return response.data;
};

export const getCarBrands = async (): Promise<CarBrandList> => {
  const response = await axios.get(`${BASE_URL}/brands`);
  return response.data;
};

export const getCarPrices = async (): Promise<number[]> => {
  const response = await axios.get(`${BASE_URL}/cars`);
  const cars: Car[] = response.data?.cars ?? [];

  const prices = cars
    .map(car => Number(car.rentalPrice))
    .filter(price => !isNaN(price));

  const uniqueSortedPrices = Array.from(new Set(prices)).sort((a, b) => a - b);

  return uniqueSortedPrices;
};
