import { Link } from 'react-router-dom';

import {
  faArrowRightFromBracket,
  faBars,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useAuth from '../../../common/hooks/useAuth';
import AutorizationSvg from './AutorizationSvg';
import BurgerSvg from './BurgerSvg';

interface Props {
  openNav: boolean;
  setOpenNav: (val: boolean) => void;
}

function Header({ openNav, setOpenNav }: Props): JSX.Element {
  const { auth } = useAuth();

  return (
    <header className="flex justify-between items-center px-3 text-blue-400 w-[100%] h-16">
      <button
        className="w-10 inline-flex items-center"
        type="button"
        onClick={() => setOpenNav(!openNav)}
      >
        <FontAwesomeIcon
          icon={faBars}
          className={`text-blue-300 w-8 h-8 transition-transform ${
            openNav ? 'rotate-90' : 'rotate-0'
          }`}
        />
      </button>
      <button className="flex items-center font-bold text-4xl" type="button">
        <Link to="/">RS Lang</Link>
      </button>
      <div className="flex items-center gap-x-3">
        {auth?.name && (
          <div className="flex flex-col items-center gap-y-1">
            <p className="text-base text-slate-600 font-semibold">
              {auth.name}
            </p>
            <button
              type="button"
              className="bg-blue-300 w-8 h-6 flex items-center justify-center rounded"
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="text-slate-600"
              />
            </button>
          </div>
        )}
        <Link
          className="w-12 h-12 bg-blue-300 inline-flex justify-center items-center rounded-full"
          to="/signin"
        >
          <FontAwesomeIcon icon={faUser} className="text-slate-600 w-8 h-8" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
