import { BounceLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderBackdrop}>
      <BounceLoader color="#0d6efd" />
    </div>
  );
};

export default Loader;
