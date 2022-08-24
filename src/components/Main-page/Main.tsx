import {
  Route,
  Routes
} from "react-router-dom";

import About from "./Mock/About";
import Auth from "./Mock/Auth";
import Dictionary from "./Mock/Dictionary";
import Games from "./Mock/Games";
import Home from "./Mock/Home";
import Statistic from "./Mock/Statistic";
import TextBook from "./Mock/TextBook";

const Main = (): JSX.Element => (
  <main className="grow flex justify-center px-3 text-7xl bg-slate-200 transition-all">
    <Routes>
      <Route path="/" caseSensitive={false} element={<Home />} />
      <Route path="/textbook" caseSensitive={false} element={<TextBook />} />
      <Route path="/dictionary" caseSensitive={false} element={<Dictionary />} />
      <Route path="/games" caseSensitive={false} element={<Games />} />
      <Route path="/statistic" caseSensitive={false} element={<Statistic />} />
      <Route path="/auth" caseSensitive={false} element={<Auth />} />
      <Route path="/about" caseSensitive={false} element={<About />} />
    </Routes>
  </main>
);

export default Main;