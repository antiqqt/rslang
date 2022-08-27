import { useMemo, useState } from 'react';

import WordData from '../../common/types/WordData'
import AudiochallengeItem from './AudiochallengeItem';
import { getFalseWords, getTrueWords } from './CreateCollection';
import GameResult from './GameResult';
import getQuestionsAudiochallenge from './GetQuestionsAudiochallenge';
import StartGame from './StartGame';

interface Props {
  preCheckedGroup?: number;
}

function Audiochallenge({ preCheckedGroup }: Props): JSX.Element {
  
  const trueWords: WordData[] = getTrueWords();
  const falseWords: WordData[] = getFalseWords();

  const [group, setGroup] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const questions = getQuestionsAudiochallenge(trueWords, falseWords);
  const correctAnswers: WordData[] = useMemo(() => {
    const result: WordData[] = [];
    return result
  }, []);
  const wrongAnswers: WordData[] = useMemo(() => {
    const result: WordData[] = [];
    return result
  }, []);

  return (
    <article className='flex flex-col'>
      <h2 className="mx-auto text-gray-700 text-4xl p-4 text-center">Аудиовызов</h2>
      {(preCheckedGroup === undefined) && !gameStarted && <StartGame
        group={group}
        setGroup={setGroup}
        isStarted={gameStarted}
        setIsGameStarted={setGameStarted}
        gameName='audiochallenge'
      />}
      {(gameStarted || preCheckedGroup) && !gameEnded &&
        <AudiochallengeItem 
          questions={questions}
          wrongAnswers={wrongAnswers}
          correctAnswers={correctAnswers}
          setGameEnded={setGameEnded}
        />
      }
      {gameEnded && 
        <GameResult 
        wrongAnswers={wrongAnswers}
        correctAnswers={correctAnswers}
        />
      }
    </article>
  )
}

Audiochallenge.defaultProps = {
  preCheckedGroup: undefined
}

export default Audiochallenge