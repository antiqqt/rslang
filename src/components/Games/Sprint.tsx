import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import apiPaths from "../../common/api/api-paths";
import getWords from "../../common/api/words";
import textbookConstants from "../../common/constants/tb-constants";
import environment from "../../common/environment/environment";
import useAuth from '../../common/hooks/useAuth';
import useSafeRequest from '../../common/hooks/useSafeRequest';
import { AggregatedWords } from "../../common/types/AggregatedWordData";
import TextBookToGameData from '../../common/types/TextBookToGameData';
import WordData from '../../common/types/WordData';
import { getRandom0toMax } from "../../common/utilities/Utilities";
import GameResult from './GameResult';
import getQuestionsSprint from './GetQuestionsSprint';
import SprintItem from './SprintItem';
import StartGame from './StartGame';

function Sprint(): JSX.Element {

  const gameName = 'sprint';
  const location = useLocation();
  const textBookData = location.state as TextBookToGameData;

  const { MAX_PAGE_INDEX } = textbookConstants;

  const userWords = useMemo(() => textBookData ? textBookData.words : [], [textBookData])
  const locationLaunch = useMemo(() => textBookData ? 'book' : 'menu', [textBookData])
  const [page, setPage] = useState(textBookData ? textBookData.page : getRandom0toMax(MAX_PAGE_INDEX));
  const [group, setGroup] = useState(textBookData ? textBookData.group : 0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [trueWords, setTrueWords] = useState<WordData[]>([]);

  const countOfTrueWords = 20;

  const { auth, setAuth } = useAuth();
  const safeRequest = useSafeRequest();
  const navigate = useNavigate();

  useEffect(() => {
    if (refresh) {
      if (!auth || !setAuth) {
        getWords(group, page)
          .then((data) => setTrueWords(data))
          .catch((error) => console.error(error));
      } else {
        const url =
        group !== textbookConstants.HARD_WORDS_GROUP_NUM
          ? `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.AggregatedWords}?group=${group}&page=${page}&wordsPerPage=20`
          : `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.AggregatedWords}?filter=${textbookConstants.HARD_WORDS_QUERY}&wordsPerPage=20`;
        safeRequest
          .get<AggregatedWords>(url, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then((res) => setTrueWords(res.data[0].paginatedResults))
          .catch(() => {
            setAuth(null);
            localStorage.removeItem(environment.localStorageKey);
            navigate(apiPaths.Signin, { replace: true });
          });
      }
    } else if (locationLaunch === 'menu') {
      if (!auth || !setAuth) {
        getWords(group, page)
          .then((data) => setTrueWords(data))
          .catch((error) => console.error(error));
      } else {
        const url =
          group !== textbookConstants.HARD_WORDS_GROUP_NUM
            ? `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.AggregatedWords}?group=${group}&page=${page}&wordsPerPage=20`
            : `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.AggregatedWords}?filter=${textbookConstants.HARD_WORDS_QUERY}&wordsPerPage=20`;

        safeRequest
          .get<AggregatedWords>(url, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then((res) => setTrueWords(res.data[0].paginatedResults))
          .catch(() => {
            setAuth(null);
            localStorage.removeItem(environment.localStorageKey);
            navigate(apiPaths.Signin, { replace: true });
          });
      }
    } else if (locationLaunch === 'book') {
      if (!auth || !setAuth) {
        setTrueWords(userWords)
      } else {
        const dryWordsArray = userWords.filter((word) => word.userWord?.difficulty !== 'learned').slice(0, 20)
        setTrueWords(dryWordsArray)
        if (dryWordsArray.length < countOfTrueWords) {

          const url =
            group !== textbookConstants.HARD_WORDS_GROUP_NUM
              ? `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.AggregatedWords}?group=${group}&page=${page}&wordsPerPage=20`
              : `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.AggregatedWords}?filter=${textbookConstants.HARD_WORDS_QUERY}&wordsPerPage=600`;
          safeRequest
            .get<AggregatedWords>(url, {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            })
            .then((res) => setTrueWords(prev => prev.concat(
              res.data[0].paginatedResults
                .filter((word) => (word.page < page && word.group === group))
                .reverse()
            ).slice(0, countOfTrueWords)))
            .catch(() => {
              setAuth(null);
              localStorage.removeItem(environment.localStorageKey);
              navigate(apiPaths.Signin, { replace: true });
            });
        }
      }
    }
  }, [group, locationLaunch, page, userWords, auth, navigate, safeRequest, setAuth, refresh]
  )

  const questions = getQuestionsSprint(trueWords);
  
  const answerSeries: boolean[] = useMemo(() => refresh ? [] : [], [refresh]);
  const correctAnswers: WordData[] = useMemo(() => refresh ? [] : [], [refresh]);
  const wrongAnswers: WordData[] = useMemo(() => refresh ? [] : [], [refresh]);

  useEffect(() => {
    if (refresh) {
      setGameEnded(false);
      setGameStarted(false);
      setRefresh(false);
    }
  }, [refresh]
  )

  return (
    <article className='flex flex-col p-6'>
      <h2 className="mx-auto text-slate-700 text-4xl font-medium py-2">????????????</h2>
      {!gameStarted && <StartGame
        group={group}
        locationLaunch={locationLaunch}
        setPage={setPage}
        setGroup={setGroup}
        isStarted={gameStarted}
        setIsGameStarted={setGameStarted}
        gameName={gameName}
      />}
      {gameStarted && !gameEnded &&
        <SprintItem
          questions={questions}
          wrongAnswers={wrongAnswers}
          correctAnswers={correctAnswers}
          answerSeries={answerSeries}
          setGameEnded={setGameEnded}
          gameEnded={gameEnded}
        />
      }
      {gameEnded &&
        <GameResult
          wrongAnswers={wrongAnswers}
          correctAnswers={correctAnswers}
          answerSeries={answerSeries}
          setRefresh={setRefresh}
          gameName={gameName}
        />
      }
    </article>
  )
}

export default Sprint