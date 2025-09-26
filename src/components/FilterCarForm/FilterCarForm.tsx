import { useState } from 'react';
import css from './FilterCarForm.module.css';
import type { Filters } from '../../types/car';

interface Props {
  onApply: (filters: Filters) => void;
  brands: string[];
  prices: number[];
  initialFilters?: Filters;
}

export const FilterCarForm = ({ onApply, brands, prices }: Props) => {
  const [filters, setFilters] = useState<Filters>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const parsedValue =
      value === ''
        ? undefined
        : name.includes('mileage') || name === 'price'
        ? Number(value)
        : value;

    setFilters(prev => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Car brand
        <select className={css.select} name="brand" onChange={handleChange}>
          <option value="">Choose a brand</option>
          {brands.map(b => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>

      <label className={css.label}>
        Price / 1 hour
        <select className={css.select} name="price" onChange={handleChange}>
          <option value="">Choose a price</option>
          {prices.map(p => (
            <option key={p} value={p}>
              To ${p}
            </option>
          ))}
        </select>
      </label>

      <label className={css.label}>
        Car mileage / km
        <div className={css.mileageInputs}>
          <input
            className={css.input}
            type="number"
            name="mileageFrom"
            placeholder="From"
            onChange={handleChange}
          />
          <input
            className={css.input}
            type="number"
            name="mileageTo"
            placeholder="To"
            onChange={handleChange}
          />
        </div>
      </label>

      <button type="submit" className={css.searchButton}>
        Search
      </button>
    </form>
  );
};
