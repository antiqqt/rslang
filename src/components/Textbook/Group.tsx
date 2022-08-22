import { useState } from 'react';

import SectionIcon from './GroupIcon';

interface Props {
  group: number;
  handleSetGroup: (val: number) => void;
  handleSetPage: (val: number) => void;
}

export default function Group({ group, handleSetGroup, handleSetPage }: Props) {
  const [isMenuOpened, SetIsMenuOpened] = useState(false);
  const availableGroups = 6;

  return (
    <div className="relative">
      <button
        className="inline-flex items-center justify-center gap-x-3 max-w-max px-3 py-1 text-white text-base font-medium 
        rounded-lg border-2 border-transparent
        bg-blue-400 hover:bg-blue-100 hover:text-blue-500 hover:border-blue-500
        focus:outline-none"
        onClick={() =>
          isMenuOpened ? SetIsMenuOpened(false) : SetIsMenuOpened(true)
        }
        type="button"
      >
        <SectionIcon />
        Раздел {group + 1}
      </button>
      {isMenuOpened && (
        <div className="absolute right-0 z-10 flex flex-col items-center w-32 bg-white rounded divide-y divide-gray-100 shadow">
          <ul className="w-full py-1 text-sm text-center text-gray-700 dark:text-gray-200">
            {new Array(availableGroups).fill(null).map((_, index) => (
              <li>
                <button
                  className="block w-full py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  key={`Group ${availableGroups - index}`}
                  onClick={() => {
                    handleSetGroup(index);
                    SetIsMenuOpened(false);
                    handleSetPage(0);
                  }}
                  type="button"
                >
                  Раздел {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
