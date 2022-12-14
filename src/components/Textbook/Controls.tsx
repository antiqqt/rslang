import WordData from '../../common/types/WordData';
import Games from './Games';
import Group from './Group';
import Pagination from './Pagination';

interface Props {
  page: number;
  handleSetPage: (val: number) => void;

  group: number;
  handleSetGroup: (val: number) => void;

  pageLearned: boolean;

  words: WordData[];
}

const HARD_WORDS_GROUP = 6;

export default function TextbookControls({
  page,
  handleSetPage,
  group,
  handleSetGroup,
  pageLearned,
  words,
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
      {!pageLearned && <Games group={group} page={page} words={words} />}
      {group !== HARD_WORDS_GROUP && (
        <Pagination
          handleSetPage={handleSetPage}
          page={page}
          pageLearned={pageLearned}
        />
      )}
    </section>
  );
}
