import { useEffect, useState } from 'react';

import getWords from '../../common/api/words';
import WordData from '../../common/types/WordData';
import WordList from '../WordList/WordList';
import Controls from './Controls';

export default function Textbook() {
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const [words, setWords] = useState<WordData[]>([]);

  useEffect(() => {
    getWords(group, page)
      .then((data) => setWords(data))
      .catch((error) => console.error(error));
  }, [group, page]);

  return (
    <main className="flex flex-col gap-y-6 h-full px-3 py-8 font-medium text-2xl text-white">
      <h2 className="mx-auto text-gray-700 text-4xl">Учебник</h2>
      <Controls
        group={group}
        handleSetGroup={setGroup}
        handleSetPage={setPage}
        page={page}
      />
      <WordList words={words} />
    </main>
  );
}
