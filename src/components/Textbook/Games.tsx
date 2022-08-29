import { useEffect, useRef, useState } from 'react';

import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Games() {
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
        className="inline-flex items-center justify-center gap-x-3 max-w-max px-3 py-1 text-white text-base font-medium 
    rounded-lg border-2 border-transparent bg-blue-400 hover:bg-white hover:text-blue-400 hover:border-blue-400
    focus:outline-none"
        onClick={() => SetIsMenuOpen((prev) => !prev)}
        type="button"
      >
        <FontAwesomeIcon icon={faGamepad} className="text-slate-600" />
        Мини-игры
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 z-10 flex flex-col items-center w-full bg-white rounded divide-y divide-gray-100 shadow">
          <ul className="w-full py-1 text-sm text-center text-gray-700 dark:text-gray-200">
            <li>
              <button
                className="block w-full py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => SetIsMenuOpen(false)}
                type="button"
              >
                Аудиовызов
              </button>
            </li>
            <li>
              <button
                className="block w-full py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => SetIsMenuOpen(false)}
                type="button"
              >
                Спринт
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
