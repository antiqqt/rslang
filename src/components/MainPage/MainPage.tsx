import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import GamesRoutes from '../../common/routes/GamesRoutes';
import NavRoutes from '../../common/routes/NavRoutes';
import Audiochallenge from '../Games/Audiochallenge';
import Games from '../Games/GamesList';
import Sprint from '../Games/Sprint';
import Textbook from '../Textbook/Textbook';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import About from './Mock/About';
import Auth from './Mock/Auth';
import Home from './Mock/Home';
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
              <Route path={`${NavRoutes.main.path}`} element={<Home />} />
              <Route path={`${NavRoutes.textbook.path}`} element={<Textbook />} />
              <Route path={`${NavRoutes.games.path}`} element={<Games />} />
              <Route path={`${NavRoutes.statistics.path}`} element={<Statistic />} />
              <Route path="/auth" element={<Auth />} />
              <Route path={`${NavRoutes.about.path}`} element={<About />} />
              <Route path={`${GamesRoutes.audiochallenge.path}`} element={<Audiochallenge />} />
              <Route path={`${GamesRoutes.sprint.path}`} element={<Sprint />} />
            </Routes>
          </main>
        </section>
        <Footer />
      </Router>
    </section>
  );
}
