import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import { Catalog } from '../../pages/Catalog/Catalog';
import { Details } from '../../pages/Details/Details';
import Header from '../Header/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
