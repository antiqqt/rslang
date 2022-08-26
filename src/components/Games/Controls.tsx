import Group from './Group';
import StartButton from './StartButton';

interface Props {
  group: number;
  handleSetGroup: (val: number) => void;
}

export default function AudioGameControls({
  group,
  handleSetGroup,
}: Props) {
  return (
    <section
      className="flex flex-col items-center
     gap-4  h-16 md:flex-row md:justify-center"
    >
      <Group
        group={group}
        handleSetGroup={handleSetGroup}
      />      
      <StartButton/>
    </section>
  );
}
