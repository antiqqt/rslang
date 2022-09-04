import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import TextBookToGameData from '../../common/types/TextBookToGameData';
import WordData from '../../common/types/WordData'
import AudiochallengeItem from './AudiochallengeItem';
import { getFalseWords, useTrueWords } from './CreateCollection';
import GameResult from './GameResult';
import getQuestionsAudiochallenge from './GetQuestionsAudiochallenge';
import StartGame from './StartGame';

function Audiochallenge(): JSX.Element {

  const location = useLocation()
  const textBookData = location.state as TextBookToGameData;

  const userWords = useMemo(() => textBookData ? textBookData.words : [], [textBookData])
  const locationLaunch = useMemo(() => textBookData ? 'book' : 'menu', [textBookData])
  const [page, setPage] = useState(textBookData ? textBookData.page : 0);
  const [group, setGroup] = useState(textBookData ? textBookData.group : 0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const countOfFalseWords = 4;
  const countOfTrueWords = 20;

  const trueWords: WordData[] = useTrueWords(group, page, userWords, locationLaunch, countOfTrueWords);
  const falseWords: string[][] = useMemo(() => getFalseWords(trueWords, countOfFalseWords), [trueWords]);

  const questions = getQuestionsAudiochallenge(trueWords, falseWords);

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
      <h2 className="mx-auto text-gray-700 text-4xl p-4 text-center">Аудиовызов</h2>
      {!gameStarted && <StartGame
        group={group}
        locationLaunch={locationLaunch}
        setPage={setPage}
        setGroup={setGroup}
        isStarted={gameStarted}
        setIsGameStarted={setGameStarted}
        gameName='audiochallenge'
      />}
      {gameStarted && !gameEnded &&
        <AudiochallengeItem
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

Audiochallenge.defaultProps = {
  preCheckedGroup: undefined
}

export default Audiochallenge