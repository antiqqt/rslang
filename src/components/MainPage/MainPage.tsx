import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AppRoutes from '../../common/routes/AppRoutest';
import Profile from '../Auth/Profile';
import Register from '../Auth/Register';
import RequireAuth from '../Auth/RequireAuth';
import RequireNoAuth from '../Auth/RequireNoAuth';
import Signin from '../Auth/Signin';
import Textbook from '../Textbook/Textbook';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import About from './Mock/About';
import Games from './Mock/Games';
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
          <main className="grow flex justify-center text-7xl bg-slate-100 transition-all">
            <Routes>
              {/* Public routes */}
              <Route path={AppRoutes.home} element={<Home />} />
              <Route path={AppRoutes.textbook} element={<Textbook />} />
              <Route path={AppRoutes.games} element={<Games />} />
              <Route path={AppRoutes.about} element={<About />} />

              {/* Protected routes */}
              <Route element={<RequireAuth />}>
                <Route path={AppRoutes.statistics} element={<Statistic />} />
                <Route path={AppRoutes.profile} element={<Profile />} />
              </Route>
              <Route element={<RequireNoAuth />}>
                <Route path={AppRoutes.signin} element={<Signin />} />
                <Route path={AppRoutes.register} element={<Register />} />
              </Route>
            </Routes>
          </main>
        </section>
        <Footer />
      </Router>
    </section>
  );
}
