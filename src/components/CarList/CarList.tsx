import { CarCard } from '../CarCard/CarCard';
import { useCarsInfinite } from '../../hooks/useCarsInfinite';
import css from './CarList.module.css';
import { useMemo } from 'react';
import type { Filters } from '../../types/car';

export const CarList = ({ filters }: { filters?: Filters }) => {
  const filtersKey = useMemo(() => JSON.stringify(filters), [filters]);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    hasNextPage,
  } = useCarsInfinite(filters, filtersKey);

  const flatCars = useMemo(() => {
    return data?.pages?.flatMap(page => page.cars) ?? [];
  }, [data]);

  const filteredCars = useMemo(() => {
    let cars = flatCars;

    if (filters?.price) {
      const maxPrice = Number(filters.price);
      cars = cars.filter(car => Number(car.rentalPrice) <= maxPrice);
    }

    if (filters?.mileageFrom !== undefined) {
      cars = cars.filter(car => Number(car.mileage) >= filters.mileageFrom!);
    }
    if (filters?.mileageTo !== undefined) {
      cars = cars.filter(car => Number(car.mileage) <= filters.mileageTo!);
    }

    return cars;
  }, [flatCars, filters]);

  const uniqueCars = useMemo(() => {
    return Array.from(new Map(filteredCars.map(car => [car.id, car])).values());
  }, [filteredCars]);

  if (isLoading) return <p>Loading cars...</p>;
  if (isError) return <p>Failed to load cars. Please try again later.</p>;

  return (
    <div>
      <div className={css.box}>
        {uniqueCars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {hasNextPage &&
        ((!filters?.price &&
          filters?.mileageFrom === undefined &&
          filters?.mileageTo === undefined) ||
          uniqueCars.length % 12 === 0) && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={css.loadMore}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </button>
        )}

      {uniqueCars.length === 0 && <p>No cars found</p>}
    </div>
  );
};
