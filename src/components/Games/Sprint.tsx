import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import TextBookToGameData from '../../common/types/TextBookToGameData';
import WordData from '../../common/types/WordData'
import { useTrueWords } from './CreateCollection';
import GameResult from './GameResult';
import getQuestionsSprint from './GetQuestionsSprint';
import SprintItem from './SprintItem';
import StartGame from './StartGame';

function Sprint(): JSX.Element {

  const location = useLocation();
  const textBookData = location.state as TextBookToGameData;

  const userWords = useMemo(() => textBookData ? textBookData.words : [], [textBookData])
  const locationLaunch = useMemo(() => textBookData ? 'book' : 'menu', [textBookData])
  const [page, setPage] = useState(textBookData ? textBookData.page : 0);
  const [group, setGroup] = useState(textBookData ? textBookData.group : 0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const countOfTrueWords = 20;

  const trueWords = useTrueWords(group, page, userWords, locationLaunch, countOfTrueWords);
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
    <article className='flex flex-col'>
      <h2 className="mx-auto text-gray-700 text-4xl p-4 text-center">Спринт</h2>
      {!gameStarted && <StartGame
        group={group}
        locationLaunch={locationLaunch}
        setPage={setPage}
        setGroup={setGroup}
        isStarted={gameStarted}
        setIsGameStarted={setGameStarted}
        gameName='sprint'
      />}
      {gameStarted && !gameEnded &&
        <SprintItem
          questions={questions}
          wrongAnswers={wrongAnswers}
          correctAnswers={correctAnswers}
          answerSeries={answerSeries}
          setGameEnded={setGameEnded}
        />
      }
      {gameEnded &&
        <GameResult
          wrongAnswers={wrongAnswers}
          correctAnswers={correctAnswers}
          answerSeries={answerSeries}
          setRefresh={setRefresh}
        />
      }
    </article>
  )
}

export default Sprint