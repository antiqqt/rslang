import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Audiochallenge from '../Games/Audiochallenge';
import Games from '../Games/GamesList';
import Textbook from '../Textbook/Textbook';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import About from './Mock/About';
import Auth from './Mock/Auth';
import Home from './Mock/Home';
import Sprint from './Mock/Sprint';
import Statistic from './Mock/Statistic';
import NavBar from './NavBar';

export default function MainPage(): JSX.Element {
  const [openNav, setOpenNav] = useState(false);

  return (
    <section className="flex flex-wrap flex-col min-h-screen overflow-x-hidden">
      <Router>
        <Header openNav={openNav} setOpenNav={setOpenNav} />
        <section className="grow flex">
          <NavBar openNav={openNav} setOpenNav={setOpenNav} />
          <main className="grow flex justify-center px-3 text-7xl bg-slate-100 transition-all">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/textbook" element={<Textbook />} />
              <Route path="/games" element={<Games />} />
              <Route path="/statistics" element={<Statistic />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/audiochallenge" element={<Audiochallenge />} />
              <Route path="/sprint" element={<Sprint />} />
            </Routes>
          </main>
        </section>
        <Footer />
      </Router>
    </section>
  );
}
