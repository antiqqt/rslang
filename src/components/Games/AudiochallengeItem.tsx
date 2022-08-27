import { MouseEvent, useState } from "react";

import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import environment from '../../common/environments/environment';
import QuestionData from "../../common/types/QuestionData";
import WordData from "../../common/types/WordData";

interface Props {
  questions: QuestionData[];
  wrongAnswers: WordData[];
  correctAnswers: WordData[];
  setGameEnded: (val: boolean) => void;
}

function AudioItem({
  questions,
  wrongAnswers,
  correctAnswers,
  setGameEnded
}: Props): JSX.Element {

  const [checkState, setCheckState] = useState(false);
  const [checkedWord, setCheckedWord] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const question = questions[currentQuestion];

  function clickHandler(e: MouseEvent<HTMLButtonElement>) {
    if (!checkState) {
      setCheckState(true);
      setCheckedWord(e.currentTarget.innerText);
      if (e.currentTarget.innerText === question.answer) {
        correctAnswers.push(question.wordData);
      } else {
        wrongAnswers.push(question.wordData);
      }
    }
    if (e.currentTarget.innerText === 'Далее') {
      if (currentQuestion === questions.length - 1) {
        setGameEnded(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setCheckState(false);
        setCheckedWord('');
      }
    }
  }

  return (
    <div className="flex flex-wrap flex-col sm:flex-row md:min-w-[600px] bg-blue-100 rounded-xl p-4 shadow-lg">
      {!checkState && <div className="flex flex-col grow justify-center items-center sm:px-4 py-4">
        <FontAwesomeIcon icon={faCoffee} className='fa-2x' />
      </div>}
      {checkState && <div className="flex flex-col grow justify-center items-center sm:px-4 py-4">
        <img
          alt={`${question.answer} illustration`}
          className="block rounded-lg max-h-[200px]"
          src={`${environment.baseUrl}${question.image}`}
        />
        <div className="flex flex-wrap items-center justify-center sm:px-4 py-4">
          <FontAwesomeIcon icon={faCoffee} className='fa-xs' />
          <span className="text-2xl md:text-4xl sm:px-2">{question.answer}</span>
        </div>
      </div>}
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col items-center text-xl md:text-2xl sm:px-2">
          {question.variants.map(word => (
            <button
              type="button"
              onClick={clickHandler}
              className={`
                  ${'p-1 m-1 transition-all'}
                  ${!checkState && "hover:scale-125 cursor-pointer"}
                  ${checkState && (word === question.answer) && "text-white bg-green-500 rounded-lg"}
                  ${checkState && (word !== question.answer) && (word !== checkedWord) && "text-gray-400"}
                  ${checkState && (word !== question.answer) && (word === checkedWord) && "text-white bg-red-500 rounded-lg"}
              `}>
              {word}
            </button>
          )
          )}
        </div>
        <button className="inline-flex items-center justify-center gap-x-3 max-w-max p-3 m-3 py-1 text-white text-base font-medium 
          rounded-lg border-2 border-transparent bg-blue-400 hover:bg-white hover:text-blue-400 hover:border-blue-400
          focus:outline-none"
          type="button"
          onClick={clickHandler}>
          {checkState ? 'Далее' : 'Не знаю'}
        </button>
      </div>
    </div>
  )
}

export default AudioItem