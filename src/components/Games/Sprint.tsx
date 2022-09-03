import { useState } from 'react';

import WordData from '../../common/types/WordData'
import StartGame from './StartGame';

interface Props {
  preCheckedGroup?: number;
}

function Sprint({ preCheckedGroup }: Props): JSX.Element {

  const [page, setPage] = useState(0);
  const [group, setGroup] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <article>
      <h2 className="mx-auto text-gray-700 text-4xl p-4 text-center">Спринт</h2>
    </article>
  )
}

Sprint.defaultProps = {
  preCheckedGroup: undefined
}

export default Sprint