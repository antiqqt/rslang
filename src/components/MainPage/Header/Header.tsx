import { Link } from 'react-router-dom';

import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appRoutes from '../../../common/routes/app-routes';

interface Props {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ isNavOpen, setIsNavOpen }: Props): JSX.Element {
  return (
    <header className="flex justify-between items-center px-3 text-blue-400 w-[100%] h-16">
      <button
        className="w-10 inline-flex items-center"
        type="button"
        onClick={() => setIsNavOpen((prev) => !prev)}
      >
        <FontAwesomeIcon
          icon={faBars}
          className={`text-blue-300 w-8 h-8 transition-transform ${
            isNavOpen ? 'rotate-90' : 'rotate-0'
          }`}
        />
      </button>
      <button className="flex items-center font-bold text-4xl" type="button">
        <Link to="/">RS Lang</Link>
      </button>
      <div className="flex items-center gap-x-3">
        <Link
          className="w-12 h-12 bg-blue-300 inline-flex justify-center items-center rounded-full"
          to={appRoutes.Profile}
        >
          <FontAwesomeIcon icon={faUser} className="text-slate-600 w-8 h-8" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
