import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import appRoutes from '../../common/routes/app-routes';
import gamesRoutes from '../../common/routes/games-routes';
import Profile from '../Auth/Profile';
import Register from '../Auth/Register';
import RequireAuth from '../Auth/RequireAuth';
import RequireNoAuth from '../Auth/RequireNoAuth';
import Signin from '../Auth/Signin';
import Audiochallenge from '../Games/Audiochallenge';
import GamesList from '../Games/GamesList';
import Sprint from '../Games/Sprint';
import Statistics from '../Statistics/Statistics';
import Textbook from '../Textbook/Textbook';
import About from './About';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Home from './Home';
import NavBar from './NavBar';

export default function MainPage(): JSX.Element {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <section className="flex flex-col min-h-screen overflow-x-hidden">
      <Router>
        <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <section className="grow flex">
          <NavBar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
          <main className="grow flex justify-center text-7xl bg-slate-100 transition-all">
            <Routes>
              {/* Public routes */}
              <Route path={appRoutes.Home} element={<Home />} />
              <Route path={appRoutes.Textbook} element={<Textbook />} />
              <Route path={appRoutes.Games} element={<GamesList />} />
              <Route path={appRoutes.About} element={<About />} />
              <Route
                path={gamesRoutes.audiochallenge.path}
                element={<Audiochallenge />}
              />
              <Route path={gamesRoutes.sprint.path} element={<Sprint />} />

              {/* Protected routes */}
              <Route element={<RequireAuth />}>
                <Route path={appRoutes.Statistics} element={<Statistics />} />
                <Route path={appRoutes.Profile} element={<Profile />} />
              </Route>
              <Route element={<RequireNoAuth />}>
                <Route path={appRoutes.Signin} element={<Signin />} />
                <Route path={appRoutes.Register} element={<Register />} />
              </Route>
            </Routes>
          </main>
        </section>
        <Footer />
      </Router>
    </section>
  );
}
