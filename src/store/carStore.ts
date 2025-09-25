import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Car, Filters } from '../types/car';

interface CarStore {
  cars: Car[];
  filters: Filters;
  favorites: string[];
  setCars: (cars: Car[]) => void;
  setFilters: (filters: Filters) => void;
  toggleFavorite: (id: string) => void;
  resetCars: () => void;
}

export const useCarStore = create<CarStore>()(
  persist(
    set => ({
      cars: [],
      filters: {},
      favorites: [],
      setCars: cars => set({ cars }),
      setFilters: filters => set({ filters }),
      toggleFavorite: id =>
        set(state => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter(fav => fav !== id)
            : [...state.favorites, id],
        })),
      resetCars: () => set({ cars: [] }),
    }),
    { name: 'car-storage' }
  )
);
