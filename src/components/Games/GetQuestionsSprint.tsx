import { QuestionSprintData } from "../../common/types/QuestionData";
import WordData from "../../common/types/WordData";
import { getRandom0toMax, getRandomTrueOrFalse, shuffleSprintQuestions } from "../../common/utilities/Utilities";

export default function getQuestionsSprint(trueWords: WordData[]): QuestionSprintData[] {

  const result = [...trueWords].map((trueWord) => {
    const answer = getRandomTrueOrFalse()
    return {
      word: trueWord.word,
      answer,
      question: answer ? trueWord.wordTranslate : trueWords[getRandom0toMax(trueWords.length - 1)].wordTranslate,
      wordData: trueWord,
    }
  }
  )

  return shuffleSprintQuestions(result)
}