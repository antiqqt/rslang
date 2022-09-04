import QuestionData from "../../common/types/QuestionData";
import WordData from "../../common/types/WordData";
import  { shuffle, shuffleQustions } from "../../common/utilities/Utilities";

export default function getQuestionsSprint(trueWords: WordData[]): QuestionData[] {

  const result = [...trueWords].map((trueWord, index) => ({
      question: trueWord.audio,
      answer: trueWord.word,
      image: trueWord.image,
      audio: trueWord.audio,
      variants: [],
      wordData: trueWord
    })
  )

  return shuffleQustions(result)
}