import WordData from "../../common/types/WordData";
import { shuffle } from "../../common/utilities/Utilities";

export default function getFalseWords(trueWords: WordData[], count: number) {
  const falseWords: string[][] = trueWords.map((_word, index) => {
    const copyArray = trueWords.slice();
    copyArray.splice(index, 1);
    return shuffle(copyArray.map((word) => word.wordTranslate)).slice(0, count);
  });
  return falseWords;
}
