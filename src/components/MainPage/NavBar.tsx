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
        openNav ? 'w-48' : 'w-11'
      }`}
    >
      <nav className="flex pt-2">
        <ul className="flex h-[30vh] flex-col justify-around px-2 z-10">
          {Object.values(Routes).map(({ path, icon, fullName }) => (
            <li key={fullName} className="flex items-center justify-center w-7">
              <button type="button" onClick={() => setOpenNav(false)}>
                <Link to={path}>
                  <img src={`./assets/icons/${icon}`} alt={fullName} />
                </Link>
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
