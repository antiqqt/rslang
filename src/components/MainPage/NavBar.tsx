import { Link } from 'react-router-dom';

import Routes from '../../common/routes/NavRoutes';

interface Props {
  openNav: boolean;
  setOpenNav: (val: boolean) => void;
}

function NavBar({ openNav, setOpenNav }: Props): JSX.Element {
  return (
    <aside
      className={`${'text-2xl bg-slate-400 transition-all'} ${
        openNav ? 'w-56' : 'w-12'
      }`}
    >
      <nav className="flex">
        <ul className="flex h-[30vh] flex-col justify-around mx-3 z-10">
          {Object.values(Routes).map(({ path, shortName }) => (
            <li key={shortName}>
              <button type="button" onClick={() => setOpenNav(false)}>
                <Link to={path}>{shortName}</Link>
              </button>
            </li>
          ))}
        </ul>
        <ul className="flex h-[30vh] flex-col justify-around mx-3">
          {Object.values(Routes).map(({ path, fullName }) => (
            <li key={fullName}>
              <button type="button" onClick={() => setOpenNav(false)}>
                <Link to={path}>{fullName}</Link>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default NavBar;
