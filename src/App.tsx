import { useState } from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import NavBar from "./components/Navigation/NavBar";

const App = (): JSX.Element => {  
  const [navActive, setNavActive] = useState(false); 
  function pageHandler() {
    if (navActive) setNavActive(!navActive);
  }
  return (
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    <section className="min-h-screen flex flex-wrap flex-col" onClick={pageHandler} onKeyDown={pageHandler}>
      <Router>
        <Header active={navActive} setActive={setNavActive}/>
        <section className="grow flex">
          <NavBar active={navActive} />
          <Main />
        </section>
        <Footer />
      </Router>
    </section>
    );
};

export default App;
