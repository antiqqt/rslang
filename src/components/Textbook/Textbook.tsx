import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiPaths from '../../common/api/api-paths';
import getWords from '../../common/api/words';
import textbookConstants from '../../common/constants/tb-constants';
import environment from '../../common/environment/environment';
import useAuth from '../../common/hooks/useAuth';
import useSafeRequest from '../../common/hooks/useSafeRequest';
import { AggregatedWords } from '../../common/types/AggregatedWordData';
import WordData from '../../common/types/WordData';
import Word from '../Word/Word';
import Controls from './Controls';

interface SessionData {
  lastPage: number;
  lastGroup: number;
}

export default function Textbook() {
  const { sessionStorageKey } = environment;
  const rawSessionData = sessionStorage.getItem(sessionStorageKey);
  const sessionData: SessionData = rawSessionData
    ? JSON.parse(rawSessionData)
    : { lastPage: 0, lastGroup: 0 };
  const { lastPage, lastGroup } = sessionData;

  const [page, setPage] = useState(lastPage);
  const [group, setGroup] = useState(lastGroup);

  const [words, setWords] = useState<WordData[]>([]);
  const [pageLearned, setPageLearned] = useState(false);
  const [userWord, setUserWord] = useState('');

  const { auth, setAuth } = useAuth();
  const safeRequest = useSafeRequest();
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem(
      environment.sessionStorageKey,
      JSON.stringify({
        lastPage: page,
        lastGroup: group,
      })
    );

    return () => {
      sessionStorage.setItem(
        environment.sessionStorageKey,
        JSON.stringify({
          lastPage: page,
          lastGroup: group,
        })
      );
    };
  }, [group, page]);

  useEffect(() => {
    const handleLoadWords = async () => {
      let newWords: WordData[];

      if (!auth || !setAuth) {
        newWords = await getWords(group, page);
        setWords(newWords);
        return;
      }

      try {
        const url =
          group !== textbookConstants.HARD_WORDS_GROUP_NUM
            ? `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.AggregatedWords}?group=${group}&page=${page}&wordsPerPage=20`
            : `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.AggregatedWords}?filter=${textbookConstants.HARD_WORDS_QUERY}&wordsPerPage=3600`;

        const res = await safeRequest.get<AggregatedWords>(url, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        newWords = res.data[0].paginatedResults;

        const isUserWord = (data: WordData) => 'userWord' in data;

        if (
          newWords.filter((x) => isUserWord(x)).length === newWords.length &&
          group !== textbookConstants.HARD_WORDS_GROUP_NUM
        ) {
          setPageLearned(true);
        } else {
          setPageLearned(false);
        }
        setWords(newWords);
      } catch (err) {
        console.log(err);
        // setAuth(null);
        // localStorage.removeItem(environment.localStorageKey);
        // navigate(apiPaths.Signin, { replace: true });
      }
    };

    handleLoadWords();
  }, [group, page, auth, navigate, setAuth, userWord, safeRequest]);

  return (
    <article className="grow flex flex-col gap-y-5 w-full px-3 pt-8 font-medium text-2xl text-white">
      <h2 className="mx-auto text-slate-700 text-4xl">Учебник</h2>
      <Controls
        group={group}
        handleSetGroup={setGroup}
        handleSetPage={setPage}
        page={page}
        pageLearned={pageLearned}
        words={words}
      />
      {pageLearned && group !== textbookConstants.HARD_WORDS_GROUP_NUM && (
        <p className="flex justify-center mx-auto px-2 py-1 text-slate-600 text-base text-center bg-emerald-300 rounded-lg">
          Поздравляем! <br />
          Вы полностью изучили эту страницу.
        </p>
      )}
      <section className="flex flex-col items-center gap-y-6 pb-8 md:px-4 lg:px-6">
        {words.map((data) => (
          <Word
            currentGroup={group}
            data={data}
            setUserWord={setUserWord}
            key={data.id ? data.id : data._id}
          />
        ))}
        {words.length === 0 &&
          group === textbookConstants.HARD_WORDS_GROUP_NUM && (
            <p className="flex justify-center mx-auto px-2 py-1 text-slate-600 text-base text-center bg-slate-200 border-2 border-slate-300 rounded-lg">
              Пока что тут пусто :&#40; <br />
              Попробуйте добавить слова из других разделов.
            </p>
          )}
      </section>
    </article>
  );
}
