import {
  BrowserRouter as Router,
} from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import NavBar from "./components/Navigation/NavBar";

const App = (): JSX.Element => (
  <div className="min-h-screen">
    <Router>
      <Header />
      <NavBar />
      <Main />
      <Footer />
    </Router>
  </div>
);

export default App;
