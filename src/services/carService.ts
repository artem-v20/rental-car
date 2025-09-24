import axios from 'axios';
import type { Car, CarBrandList } from '../types/car';

const BASE_URL = 'https://car-rental-api.goit.global';

export const getAllCars = async (): Promise<Car[]> => {
  const response = await axios.get<Car[]>(`${BASE_URL}/cars`);
  return response.data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const response = await axios.get<Car>(`${BASE_URL}/cars/${id}`);
  return response.data;
};

export const getCarBrands = async (): Promise<CarBrandList> => {
  const response = await axios.get<CarBrandList>(`${BASE_URL}/cars/brands`);
  return response.data;
};
