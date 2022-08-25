import { Link } from 'react-router-dom';

import AutorizationSvg from './AutorizationSvg';
import BurgerSvg from './BurgerSvg';

interface Props {
  openNav: boolean;
  setOpenNav: (val: boolean) => void;
}

function Header({ openNav, setOpenNav }: Props): JSX.Element {
  return (
    <header className="flex justify-between p-3 text-blue-400 w-[100%] h-16">
      <button
        className="w-10"
        type="button"
        onClick={() => setOpenNav(!openNav)}
      >
        <BurgerSvg />
      </button>
      <button className="font-bold text-4xl" type="button">
        <Link to="/">RS Lang</Link>
      </button>
      <Link className="w-10" to="/auth">
        <AutorizationSvg />
      </Link>
    </header>
  );
}

export default Header;
