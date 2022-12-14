import { useCallback, useEffect, useMemo, useState } from "react";

import { Howl } from 'howler';

import environment from '../../common/environment/environment';
import { QuestionData } from "../../common/types/QuestionData";
import WordData from "../../common/types/WordData";
import AudioButton from "./AudioButton";

interface Props {
  questions: QuestionData[];
  wrongAnswers: WordData[];
  correctAnswers: WordData[];
  answerSeries: boolean[];
  setGameEnded: (val: boolean) => void;
}

function AudioItem({
  questions,
  wrongAnswers,
  correctAnswers,
  answerSeries,
  setGameEnded
}: Props): JSX.Element {

  const [checkState, setCheckState] = useState(false);
  const [checkedWord, setCheckedWord] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const doNotKnowAnswer = 'Не знаю';
  const nextButtonInner = 'Далее'

  const audioCorrect = useMemo(() => new Howl({
    src: [`./assets/sounds/correct.mp3`]
  }), []);
  const audioWrong = useMemo(() => new Howl({
    src: [`./assets/sounds/wrong.mp3`]
  }), []);

  const question = questions[currentQuestion];
  const audio = useMemo(() => new Howl({
    src: [`${environment.baseUrl}/${question.audio}`]
  }), [question.audio]);

  const clickHandler = useCallback((checkedAnswer: string) => {
    if (!checkState) {
      setCheckState(true);
      setCheckedWord(checkedAnswer);
      if (checkedAnswer === question.answer) {
        audioCorrect.play();
        correctAnswers.push(question.wordData);
        answerSeries.push(true)
      } else {
        audioWrong.play();
        wrongAnswers.push(question.wordData);
        answerSeries.push(false)
      }
    } else if (checkState && checkedAnswer === nextButtonInner) {
      if (currentQuestion === questions.length - 1) {
        setGameEnded(true);
      } else {
        setCheckState(false);
        setCurrentQuestion(currentQuestion + 1);
        setCheckedWord('');
      }
    }
  }, [answerSeries, checkState, correctAnswers, currentQuestion, question.answer, question.wordData, questions.length, setGameEnded, wrongAnswers, audioWrong, audioCorrect])

  const keyHandler = useCallback((key: string) => {
    if (key === 'Enter') {
      clickHandler(nextButtonInner)
    } else if (key === ' ') {
      audio.pause();
      audio.play();
    } else if ([...question.variants.keys()].includes(Number(key) - 1)) {
      clickHandler(question.variants[Number(key) - 1])
    }
  }, [clickHandler, audio, question.variants]);

  useEffect(() => {
    audio.play()
  }, [audio])

  useEffect(() => {
    document.onkeydown = (e) => {
      if(['Enter', ' ', '1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        keyHandler(e.key);
      }
      return () => {
        e.preventDefault();
        keyHandler(e.key);
      }
    };
  }, [keyHandler])

  return (
    <div className="flex flex-wrap flex-col w-56 md:w-96 bg-slate-300 rounded-xl p-4 shadow-lg text-bg-slate-700 my-4">
      {!checkState && <div className="flex flex-col grow justify-center items-center h-56 sm:px-4 py-4 transition-all">
        <AudioButton
          src={`${environment.baseUrl}/${question.audio}`}
          size='text-9xl' />
      </div>}
      {checkState && <div className="flex flex-col grow justify-center items-center py-4">
        <img
          alt={`${question.answer} illustration`}
          className="block rounded-lg max-h-[200px]"
          src={`${environment.baseUrl}/${question.image}`}
        />
        <div className="flex flex-wrap items-center justify-center sm:px-4 py-4">
          <AudioButton
            src={`${environment.baseUrl}/${question.audio}`}
            size='text-4xl' />
          <span className="text-2xl md:text-4xl px-2">{question.answer}</span>
        </div>
      </div>}
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col items-center text-xl md:text-2xl sm:px-2">
          {question.variants.map((word) => (
            <button
              type="button"
              onClick={() => clickHandler(word)}
              key={word}
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
          rounded-lg border-2 border-transparent bg-red-400 hover:bg-white hover:text-red-400 hover:border-red-400
          focus:outline-none"
          type="button"
          onClick={(e) => clickHandler(e.currentTarget.innerText)}>
          {checkState ? nextButtonInner : doNotKnowAnswer}
        </button>
      </div>
    </div>
  )
}

export default AudioItem