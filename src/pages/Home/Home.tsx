import { Link } from 'react-router-dom';
import css from './Home.module.css';

const Home = () => {
  return (
    <section className={css.heroSection}>
      <h1 className={css.title}>Find your perfect rental car</h1>
      <p className={css.description}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <Link to="/catalog" className={css.button}>
        View Catalog
      </Link>
    </section>
  );
};

export default Home;
