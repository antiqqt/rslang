import { useState } from 'react';

import WordData from '../../common/types/WordData'
import { getFalseWords, getTrueWords } from './CreateCollection';
import StartGame from './StartGame';

interface Props {
  preCheckedGroup?: number;
}

function Sprint({ preCheckedGroup }: Props): JSX.Element {

  const [page, setPage] = useState(0);
  const [group, setGroup] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const trueWords: WordData[] = getTrueWords(20, group);
  const falseWords: WordData[] = getFalseWords(120, group, trueWords);

  console.log(trueWords, falseWords)

  return (
    <article>
      <h2 className="mx-auto text-gray-700 text-4xl p-4 text-center">Спринт</h2>
      {(preCheckedGroup === undefined) && !gameStarted && <StartGame
        group={group}
        setPage={setPage}
        setGroup={setGroup}
        isStarted={gameStarted}
        setIsGameStarted={setGameStarted}
        gameName='sprint'
      />}
      {(gameStarted || preCheckedGroup) &&
        <span>
          game started
          {console.log(group)}
        </span>
      }
    </article>
  )
}

Sprint.defaultProps = {
  preCheckedGroup: undefined
}

export default Sprint