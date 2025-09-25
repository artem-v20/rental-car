import { Link } from 'react-router-dom';
import type { Car } from '../../types/car';
import { useCarStore } from '../../store/carStore';
import { formatMileage } from '../../utils/formatMileage';
import css from './CarCard.module.css';
import { FiHeart } from 'react-icons/fi';

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const { favorites, toggleFavorite } = useCarStore();
  const isFavorite = favorites.includes(car.id);

  return (
    <div className={css.card}>
      <div>
        <div className={css.imgWrapper}>
          <img
            className={css.cardImg}
            src={car.img}
            alt={`${car.brand} ${car.model} ${car.year}`}
          />
          <button
            className={`${css.heartButton} ${isFavorite ? css.active : ''}`}
            onClick={() => toggleFavorite(car.id)}
          >
            <FiHeart />
          </button>
        </div>

        <div className={css.wrapperTitlePrice}>
          <h2 className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,{' '}
            {car.year}
          </h2>
          <p className={css.priceDescr}>${car.rentalPrice}</p>
        </div>

        <p className={css.carDescr}>
          <span>
            {car.address.split(',')[1]?.trim()} |{' '}
            {car.address.split(',').pop()?.trim()} | {car.rentalCompany} |
          </span>
          <span>
            {car.type} | {formatMileage(car.mileage)}
          </span>
        </p>
      </div>

      <Link to={`/catalog/${car.id}`} className={css.cardButton}>
        Read more
      </Link>
    </div>
  );
};
