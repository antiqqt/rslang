import Group from '../Textbook/Group';
import StartButton from './StartButton';

interface Props {
  group: number;
  handleSetPage: (val: number) => void;
  handleSetGroup: (val: number) => void;
  isStarted: boolean;
  setIsGameStarted: (val: boolean) => void
}

export default function AudioGameControls({
  group,
  handleSetGroup,
  handleSetPage,
  isStarted,
  setIsGameStarted,
}: Props) {
  return (
    <section
      className="flex flex-col items-center
      gap-4 md:flex-row md:justify-center"
    >
      <Group
        group={group}
        handleSetGroup={handleSetGroup}
        handleSetPage={handleSetPage}
      />
      <StartButton
        isStarted={isStarted}
        setIsGameStarted={setIsGameStarted}
      />
    </section>
  );
}
