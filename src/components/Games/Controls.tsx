import Group from '../Textbook/Group';
import StartButton from './StartButton';

interface Props {
  group: number;
  handleSetPage: (val: number) => void;
  handleSetGroup: (val: number) => void;
  isStarted: boolean;
  setIsGameStarted: (val: boolean) => void;
  locationLaunch: 'menu' | 'book'
}

export default function AudioGameControls({
  group,
  handleSetGroup,
  handleSetPage,
  isStarted,
  setIsGameStarted,
  locationLaunch
}: Props) {

  return (
    <section
      className="flex text-3xl py-2 items-center
      gap-4 flex-row justify-center"
    >
      {locationLaunch === 'menu' && <Group
        group={group}
        handleSetGroup={handleSetGroup}
        handleSetPage={handleSetPage}
      />
      }
      <StartButton
        isStarted={isStarted}
        setIsGameStarted={setIsGameStarted}
      />
    </section>
  );
}
