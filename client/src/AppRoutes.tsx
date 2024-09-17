import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Perfil from './pages/Perfil';
import NewSale from './pages/NewSale';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/newsale" element={<NewSale />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
