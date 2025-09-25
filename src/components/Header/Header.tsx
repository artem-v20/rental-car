import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/Logo.svg';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <Link to="/">
        <img src={logo} alt="Logo" className={css.logo} />
      </Link>

      <nav className={css.navbar}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${css.navLink} ${css.active}` : css.navLink
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${css.navLink} ${css.active}` : css.navLink
          }
          to="/catalog"
          end
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
