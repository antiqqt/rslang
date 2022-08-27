import QuestionData from "../../common/types/QuestionData";
import WordData from "../../common/types/WordData";
import { getRandom0toMax } from "../../common/utilities/Utilities";

export default function getQuestionsAudiochallenge(trueWords: WordData[], falseWords: WordData[]): QuestionData[] {
  return trueWords.map((trueWord) => ({
      question: trueWord.audio,
      answer: trueWord.word,
      image: trueWord.image,
      variants: [...Array(4).keys()].map(() => falseWords[getRandom0toMax(falseWords.length - 1)].word).concat([trueWord.word]).sort(),
      wordData: trueWord
    })
  )
}