import Group from './Group';
import StartButton from './StartButton';

interface Props {
  group: number;
  handleSetGroup: (val: number) => void;
  isStarted: boolean;
  setIsGameStarted: (val: boolean) => void
}

export default function AudioGameControls({
  group,
  handleSetGroup,
  isStarted,
  setIsGameStarted,
}: Props) {
  return (
    <section
      className="flex flex-col items-center
     gap-4 sm:flex-row justify-center"
    >
      <Group
        group={group}
        handleSetGroup={handleSetGroup}
      />
      <StartButton
        isStarted={isStarted}
        setIsGameStarted={setIsGameStarted}
      />
    </section>
  );
}
