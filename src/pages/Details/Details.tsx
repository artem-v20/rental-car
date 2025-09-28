import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCarById } from '../../services/carService';
import { BookingForm } from '../../components/BookingForm/BookingForm';
import { formatMileage } from '../../utils/formatMileage';
import css from './Details.module.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { SlSettings } from 'react-icons/sl';
import {
  BsCalendar4Week,
  BsCarFront,
  BsCheckCircle,
  BsFuelPump,
} from 'react-icons/bs';
import Loader from '../../components/Loader/Loader';

export const Details = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['car', id],
    queryFn: () => getCarById(id!),
    enabled: !!id,
  });

  if (isLoading) return <Loader />;
  if (isError || !car) return <p>Car not found</p>;

  return (
    <div className={css.container}>
      <div className={css.leftSideWrap}>
        <div className={css.imageWrapper}>
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={css.image}
          />
        </div>

        <BookingForm />
      </div>

      <div className={css.rightSideWrap}>
        <div className={css.details}>
          <div className={css.titleWrap}>
            <h1 className={css.title}>
              {car.brand} {car.model}, {car.year}
            </h1>
            <p className={css.carId}>Id: {car.id.slice(0, 4)}</p>
          </div>
          <div className={css.adressMileageWrap}>
            <p className={css.carAdress}>
              <FaMapMarkerAlt className={css.mapMarker} />
              {car.address.split(',').slice(-2).join(', ').trim()}
            </p>
            <p className={css.carMileage}>
              Mileage: {formatMileage(car.mileage)}
            </p>
          </div>
          <p className={css.carRentalPrice}>${car.rentalPrice}</p>
          <p className={css.carDescription}>{car.description}</p>
        </div>

        <div className={css.carInfo}>
          <div className={css.carInfoWrap}>
            <h2 className={css.carInfoTitle}>Rental Conditions:</h2>
            <ul className={css.carInfoList}>
              {car.rentalConditions.map(item => (
                <li key={item} className={css.carInfoItem}>
                  <BsCheckCircle className={css.BsCheckCircle} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={css.carInfoWrap}>
            <h2 className={css.carInfoTitle}>Car Specifications:</h2>
            <ul className={css.carInfoList}>
              <li className={css.carInfoItem}>
                <BsCalendar4Week className={css.Calendar4Week} />
                Year: {car.year}
              </li>
              <li className={css.carInfoItem}>
                <BsCarFront className={css.CarFront} />
                Type: {car.type}
              </li>
              <li className={css.carInfoItem}>
                <BsFuelPump className={css.FuelPump} />
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li className={css.carInfoItem}>
                <SlSettings className={css.SlSettings} />
                Engine Size: {car.engineSize}
              </li>
            </ul>
          </div>

          <div className={css.carInfoWrap}>
            <h2 className={css.carInfoTitle}>
              Accessories and functionalities:
            </h2>
            <div className={css.carInfoList}>
              <ul className={css.carInfoList}>
                {car.accessories.map(item => (
                  <li key={item} className={css.carInfoItem}>
                    <BsCheckCircle className={css.BsCheckCircle} />
                    {item}
                  </li>
                ))}
              </ul>
              <ul className={css.carInfoList}>
                {car.functionalities.map(item => (
                  <li key={item} className={css.carInfoItem}>
                    <BsCheckCircle className={css.BsCheckCircle} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
