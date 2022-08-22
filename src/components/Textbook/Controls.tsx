import Games from './Games';
import Group from './Group';
import Pagination from './Pagination';

interface Props {
  page: number;
  handleSetPage: (val: number) => void;

  group: number;
  handleSetGroup: (val: number) => void;
}

export default function TextbookControls({
  page,
  handleSetPage,
  group,
  handleSetGroup,
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
      <Games />
      <Pagination handleSetPage={handleSetPage} page={page} />
    </section>
  );
}
