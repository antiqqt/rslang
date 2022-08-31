import { useEffect, useRef, useState } from 'react';

import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useAuth from '../../common/hooks/useAuth';
import GroupElementData from './GroupElementData';

interface Props {
  group: number;
  handleSetGroup: (val: number) => void;
  handleSetPage: (val: number) => void;
}

export default function Group({ group, handleSetGroup, handleSetPage }: Props) {
  const [isMenuOpen, SetIsMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { auth } = useAuth();

  const availableGroups = auth
    ? GroupElementData
    : GroupElementData.filter((x) => x.name === 'Сложные слова');

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
        rounded-lg border-2 border-transparent
        bg-slate-300  hover:border-slate-400"
        onClick={() => SetIsMenuOpen((prev) => !prev)}
        type="button"
      >
        <FontAwesomeIcon
          icon={faFolder}
          style={{ color: availableGroups[group].color }}
        />
        {availableGroups[group].name}
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 z-10 flex flex-col items-center w-full bg-white rounded">
          <ul className="w-full py-1 text-sm text-center text-gray-700">
            {availableGroups.map((data, index) => (
              <li key={data.name}>
                <button
                  className="flex justify-center items-center w-full py-2 px-4 rounded hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleSetGroup(index);
                    SetIsMenuOpen(false);
                    handleSetPage(0);
                  }}
                  type="button"
                >
                  {data.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
