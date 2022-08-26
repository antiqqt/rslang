import { useEffect, useState } from 'react';

import { getRandomPage, getRandomWordNumber } from '../../common/utilities/Utilities';
import Controls from './Controls';

function Audiochallenge(): JSX.Element {
  
  const [group, setGroup] = useState(0);
  const [trueWords, setTrueWords] = useState([]);
  const [falseWords, setFalseWords] = useState([]);

  function createCollection() {
    const page = getRandomPage();
    const trueWordIndex = getRandomWordNumber();
    fetch(`http://localhost:8000/words?group=${group}&page=${page}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Fetch request failed');
        }
        return res.json();
      })
      .then((data) => trueWords.push(data[trueWordIndex] as never))
      .catch((error) => console.error(error));
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    createCollection()
    console.log(trueWords)
  }, [group]);

  return (
  <article>
    <h2 className="mx-auto text-gray-700 text-4xl text-center">Аудиовызов</h2>
    <Controls
      group={group}
      handleSetGroup={setGroup}
    />
  </article>
  )
}

export default Audiochallenge