import {
  Route,
  Routes
} from "react-router-dom";

import Dictionary from "./Mock/Dictionary";
import Games from "./Mock/Games";
import Home from "./Mock/Home";
import Statistic from "./Mock/Statistic";
import TextBook from "./Mock/TextBook";

const Main = (): JSX.Element => (
  <main className="flex justify-center mx-10 text-7xl min-h-screen">
    <Routes>
      <Route path="/" caseSensitive={false} element={<Home />} />
      <Route path="/textbook" caseSensitive={false} element={<TextBook />} />
      <Route path="/dictionary" caseSensitive={false} element={<Dictionary />} />
      <Route path="/games" caseSensitive={false} element={<Games />} />
      <Route path="/statistic" caseSensitive={false} element={<Statistic />} />
    </Routes>
  </main>
);

export default Main;