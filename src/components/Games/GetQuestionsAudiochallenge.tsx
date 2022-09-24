import { QuestionData } from "../../common/types/QuestionData";
import WordData from "../../common/types/WordData";
import  { shuffle, shuffleQustions } from "../../common/utilities/Utilities";

export default function getQuestionsAudiochallenge(trueWords: WordData[], falseWords: string[][]): QuestionData[] {

  const result = [...trueWords].map((trueWord, index) => ({
      question: trueWord.audio,
      answer: trueWord.wordTranslate,
      image: trueWord.image,
      audio: trueWord.audio,
      variants: shuffle(falseWords[index].concat([trueWord.wordTranslate])),
      wordData: trueWord
    })
  )

  return shuffleQustions(result)
}