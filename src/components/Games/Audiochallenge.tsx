import { useState } from 'react';

import WordData from '../../common/types/WordData'
import AudiochallengeItem from './AudiochallengeItem';
import { getFalseWords, getTrueWords } from './CreateCollection';
import StartGame from './StartGame';

interface Props {
  preCheckedGroup?: number;
}

function Audiochallenge({ preCheckedGroup }: Props): JSX.Element {
  const trueWordsCollection: WordData[] = getTrueWords();
  const falseWordsCollection: WordData[] = getFalseWords();

  const [group, setGroup] = useState(0);
  const [trueWords, setTrueWords] = useState(trueWordsCollection);
  const [falseWords, setFalseWords] = useState(falseWordsCollection);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <article>
      <h2 className="mx-auto text-gray-700 text-4xl p-4 text-center">Аудиовызов</h2>
      {(preCheckedGroup === undefined) && !gameStarted && <StartGame
        group={group}
        setGroup={setGroup}
        isStarted={gameStarted}
        setIsGameStarted={setGameStarted}
        gameName='audiochallenge'
      />}
      {(gameStarted || preCheckedGroup) &&
          <AudiochallengeItem />
      }
    </article>
  )
}

Audiochallenge.defaultProps = {
  preCheckedGroup: undefined
}

export default Audiochallenge