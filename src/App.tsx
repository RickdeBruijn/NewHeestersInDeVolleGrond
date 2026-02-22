import { Routes, Route } from 'react-router-dom';
import Layout from './app/layout';

import Bedrijf from './app/bedrijf/page';
import Contact from './app/contact/page';
import Voorraad from './app/voorraad/page';
import HomePage from './app/page';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="bedrijf" element={<Bedrijf />} />
        <Route path="contact" element={<Contact />} />
        <Route path="voorraad" element={<Voorraad />} />
      </Route>
    </Routes>
  );
}
