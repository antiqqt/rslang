import WordData from "../../common/types/WordData";
import { getRandom0toMax } from "../../common/utilities/Utilities";

export function getTrueWords(count: number, group: number) {

  const maxPageIndex = 29;
  const maxWordIndex = 19;
  const trueWords: WordData[] = [];
    
  for (let i = 0; i < count; i += 1) {
    const page = getRandom0toMax(maxPageIndex);
    const trueWordIndex = getRandom0toMax(maxWordIndex);
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

  return trueWords;
}

export function getFalseWords(count: number, group: number, trueWordsCollection: WordData[]) {

  const maxPageIndex = 29;
  const maxWordIndex = 19;
  const trueWordsIdCollection = trueWordsCollection.map((word) => word.id)
  const falseWords: WordData[] = [];
  
  for (let i = 0; i < count; i += 1)  {
    const page = getRandom0toMax(maxPageIndex);
    const trueWordIndex = getRandom0toMax(maxWordIndex);
    fetch(`http://localhost:8000/words?group=${group}&page=${page}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Fetch request failed');
        }
        return res.json();
      })
      .then((data) => {
        if(!trueWordsIdCollection.includes(data.id)) falseWords.push(data[trueWordIndex] as never)
      })
      .catch((error) => console.error(error));
  }

  return falseWords;
}