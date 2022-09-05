import { useEffect } from 'react';

import GamesData from '../../common/routes/games-routes';
import Controls from './Controls';

interface Props {
  group: number;
  setPage: (val: number) => void;
  setGroup: (val: number) => void;
  isStarted: boolean;
  setIsGameStarted: (val: boolean) => void
  gameName: keyof typeof GamesData;
  locationLaunch: 'menu' | 'book'
}

function StartGame({
  group,
  setPage,
  setGroup,
  isStarted,
  setIsGameStarted,
  gameName,
  locationLaunch
}: Props) {

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setIsGameStarted(true);
      }
    };
  }, [setIsGameStarted])

  return (
    <div>
      <Controls
        group={group}
        handleSetPage={setPage}
        handleSetGroup={setGroup}
        isStarted={isStarted}
        setIsGameStarted={setIsGameStarted}
        locationLaunch={locationLaunch}
      />
      <div className='text-lg sm:text-3xl p-4 text-justify'>{GamesData[gameName].description}</div>
      <ul className='text-base sm:text-2xl list-disc px-10 sm:px-20'>
        {GamesData[gameName].rules.map((rule) => (
          <li className="py-2" key={rule}>
            {rule}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StartGame