import { useInfiniteQuery } from '@tanstack/react-query';
import { getCars } from '../services/carService';
import type { Filters, PaginatedCars } from '../types/car';

export const useCarsInfinite = (filters: Filters = {}, filtersKey?: string) =>
  useInfiniteQuery<PaginatedCars, Error>({
    queryKey: ['cars', filtersKey ?? ''],
    queryFn: ({ pageParam }) => getCars(pageParam as number, 12, filters),
    getNextPageParam: lastPage => lastPage?.nextPage ?? undefined,
    initialPageParam: 1,
  });
