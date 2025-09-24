import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from '../../pages/Home/Home';
import Catalog from '../../pages/Catalog/Catalog';
import Details from '../../pages/Details/Details';

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
