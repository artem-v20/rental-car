import { useQuery } from '@tanstack/react-query';
import { getCarBrands, getCarPrices } from '../../services/carService';
import { FilterCarForm } from '../../components/FilterCarForm/FilterCarForm';
import { CarList } from '../../components/CarList/CarList';
import { useCarStore } from '../../store/carStore';
import css from './Catalog.module.css';

export const Catalog = () => {
  const { filters, setFilters } = useCarStore();

  const {
    data: brands,
    isLoading: isLoadingBrands,
    isError: isErrorBrands,
  } = useQuery({
    queryKey: ['brands'],
    queryFn: getCarBrands,
  });

  const {
    data: prices,
    isLoading: isLoadingPrices,
    isError: isErrorPrices,
  } = useQuery({
    queryKey: ['prices'],
    queryFn: getCarPrices,
  });

  if (isLoadingBrands || isLoadingPrices) {
    return <p>Loading filters...</p>;
  }

  if (isErrorBrands || isErrorPrices) {
    return <p>Failed to load filter options. Please try again later.</p>;
  }

  return (
    <div className={css.container}>
      <FilterCarForm
        brands={brands || []}
        prices={prices || []}
        onApply={setFilters}
        initialFilters={filters}
      />
      <CarList filters={filters} />
    </div>
  );
};
