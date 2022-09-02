import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Routes from '../../common/routes/games-routes';
import WordData from '../../common/types/WordData';

interface Props {
  page: number;

  group: number;

  words: WordData[];
}

export default function Games({
  page,
  group,
  words,
}: Props) {
  const [isMenuOpen, SetIsMenuOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detectClickOutside = (e: MouseEvent) => {
      if (!e.target || !(e.target instanceof Node)) return;
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        SetIsMenuOpen(false);
      }
    };

    document.addEventListener('click', detectClickOutside, { once: true });

    return () => {
      document.removeEventListener('click', detectClickOutside);
    };
  }, [isMenuOpen, SetIsMenuOpen]);

  return (
    <div ref={ref} className="relative">
      <button
        className="inline-flex items-center justify-center gap-x-3 max-w-max px-3 py-1 text-slate-700 text-base font-medium 
    rounded-lg border-2 border-transparent bg-slate-300 hover:border-slate-400"
        onClick={() => SetIsMenuOpen((prev) => !prev)}
        type="button"
      >
        <FontAwesomeIcon icon={faGamepad} className="text-slate-700" />
        Мини-игры
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 z-10 flex flex-col items-center w-full bg-white rounded">
          <ul className="w-full py-1 text-sm text-center text-gray-700 dark:text-gray-200">
            {Object.values(Routes).map(({ path, fullName }) => (
              <Link to={path} key={fullName} state={{ group, page, words }}>
                <li>
                  <button
                    className="block w-full py-2 px-4 hover:bg-gray-100 rounded cursor-pointer"
                    type="button"
                  >
                    {fullName}
                  </button>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
