import GamesData from '../../common/routes/games-routes';
import Controls from './Controls';

interface Props {
  group: number;
  setGroup: (val: number) => void;
  isStarted: boolean;
  setIsGameStarted: (val: boolean) => void
  gameName: keyof typeof GamesData;
}

function StartGame({
  group,
  setGroup,
  isStarted,
  setIsGameStarted,
  gameName
}: Props) {
  return (
    <div>
      <Controls
        group={group}
        handleSetGroup={setGroup}
        isStarted={isStarted}
        setIsGameStarted={setIsGameStarted}
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