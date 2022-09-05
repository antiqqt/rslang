import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Routes from '../../common/routes/nav-routes';

interface Props {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavBar({ isNavOpen, setIsNavOpen }: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detectClickOutside = (e: MouseEvent) => {
      if (!e.target || !(e.target instanceof Node)) return;
      if (isNavOpen && ref.current && !ref.current.contains(e.target)) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener('click', detectClickOutside, { once: true });

    return () => {
      document.removeEventListener('click', detectClickOutside);
    };
  }, [isNavOpen, setIsNavOpen]);

  return (
    <aside
      ref={ref}
      className={`${'text-2xl bg-slate-300 transition-all'} ${
        isNavOpen ? 'w-48' : 'w-11'
      }`}
    >
      <nav className="flex pt-2">
        <ul className="flex h-[30vh] flex-col justify-around px-2 z-10">
          {Object.values(Routes).map(({ path, icon, fullName }) => (
            <li key={fullName} className="flex items-center justify-center w-7 hover:scale-125 transition-all">
              <button type="button" onClick={() => setIsNavOpen(false)}>
                <Link to={path}>
                  <FontAwesomeIcon icon={icon} className="text-slate-700" />
                </Link>
              </button>
            </li>
          ))}
        </ul>
        <ul className="flex h-[30vh] flex-col justify-around mx-3 text-slate-600 ">
          {Object.values(Routes).map(({ path, fullName }) => (
            <li key={fullName} className='hover:scale-105 transition-all'>
              <button type="button" onClick={() => setIsNavOpen(false)}>
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
