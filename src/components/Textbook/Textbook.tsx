import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiPaths from '../../common/api/api-paths';
import getWords from '../../common/api/words';
import environment from '../../common/environments/environment';
import useAuth from '../../common/hooks/useAuth';
import useAxiosSecure from '../../common/hooks/useAxiosSecure';
import { AggregatedWords } from '../../common/types/AggregatedWordData';
import WordData from '../../common/types/WordData';
import WordList from '../WordList/WordList';
import Controls from './Controls';

const HARD_WORDS_GROUP = 6;
const DB_HARD_WORDS = JSON.stringify({
  $or: [{ 'userWord.difficulty': 'hard' }],
});

export default function Textbook() {
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const [words, setWords] = useState<WordData[]>([]);
  const { auth, setAuth } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !setAuth) {
      getWords(group, page)
        .then((data) => setWords(data))
        .catch((error) => console.error(error));
      return;
    }

    const url =
      group !== HARD_WORDS_GROUP
        ? `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.AggregatedWords}?group=${group}&page=${page}&wordsPerPage=20`
        : `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.AggregatedWords}?filter=${DB_HARD_WORDS}`;

    axiosSecure
      .get<AggregatedWords>(url)
      .then((res) => {
        console.log(res.data[0].paginatedResults);
        setWords(res.data[0].paginatedResults);
      })
      .catch(() => {
        setAuth(null);
        navigate(apiPaths.Signin, { replace: true });
      });
  }, [group, page, axiosSecure, auth, navigate, setAuth]);

  return (
    <main className="flex flex-col gap-y-5 h-full px-3 py-8 font-medium text-2xl text-white">
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
