import { useState, useRef, useEffect } from 'react';
import css from './FilterCarForm.module.css';
import type { Filters } from '../../types/car';
import { BsChevronDown } from 'react-icons/bs';

interface Props {
  onApply: (filters: Filters) => void;
  brands: string[];
  prices: number[];
  initialFilters?: Filters;
}

export const FilterCarForm = ({ onApply, brands, prices }: Props) => {
  const [filters, setFilters] = useState<Filters>({});
  const [openSelect, setOpenSelect] = useState<string | null>(null);

  const brandRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        brandRef.current &&
        !brandRef.current.contains(e.target as Node) &&
        priceRef.current &&
        !priceRef.current.contains(e.target as Node)
      ) {
        setOpenSelect(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (name: string, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [name]: value === '' ? undefined : value,
    }));
    setOpenSelect(null);
  };

  const handleToggle = (name: string) => {
    setOpenSelect(prev => (prev === name ? null : name));
  };

  const handleMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Витягуємо тільки цифри
    const raw = value.replace(/[^\d]/g, '');
    const parsed = raw === '' ? undefined : Number(raw);

    setFilters(prev => ({
      ...prev,
      [name]: parsed,
    }));
  };

  const formatMileage = (value: number | undefined, label: string) => {
    return value !== undefined
      ? `${label} ${value.toLocaleString('en-US')}`
      : '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Car brand
        <div className={css.customSelectWrapper} ref={brandRef}>
          <div
            className={css.customSelect}
            onClick={() => handleToggle('brand')}
          >
            <span className={css.selectedValue}>
              {filters.brand || 'Choose a brand'}
            </span>
            <BsChevronDown
              className={`${css.selectIcon} ${
                openSelect === 'brand' ? css.open : ''
              }`}
            />
          </div>
          {openSelect === 'brand' && (
            <ul className={css.dropdown}>
              {brands.map(b => (
                <li key={b} onClick={() => handleSelect('brand', b)}>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>

      <label className={css.label}>
        Price / 1 hour
        <div className={css.customSelectWrapper} ref={priceRef}>
          <div
            className={css.customSelect}
            onClick={() => handleToggle('price')}
          >
            <span className={css.selectedValue}>
              {filters.price ? `To $${filters.price}` : 'Choose a price'}
            </span>
            <BsChevronDown
              className={`${css.selectIcon} ${
                openSelect === 'price' ? css.open : ''
              }`}
            />
          </div>
          {openSelect === 'price' && (
            <ul className={css.dropdown}>
              {prices.map(p => (
                <li key={p} onClick={() => handleSelect('price', p)}>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>

      <label className={css.label}>
        Car mileage / km
        <div className={css.mileageInputs}>
          <input
            className={css.input}
            type="text"
            name="mileageFrom"
            placeholder="From"
            value={formatMileage(filters.mileageFrom, 'From')}
            onChange={handleMileageChange}
            autoComplete="off"
          />
          <input
            className={css.input}
            type="text"
            name="mileageTo"
            placeholder="To"
            value={formatMileage(filters.mileageTo, 'To')}
            onChange={handleMileageChange}
            autoComplete="off"
          />
        </div>
      </label>

      <button type="submit" className={css.searchButton}>
        Search
      </button>
    </form>
  );
};
