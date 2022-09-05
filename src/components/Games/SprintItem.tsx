import { useCallback, useEffect, useMemo, useState } from "react";

import { Howl } from 'howler';

import { QuestionSprintData } from "../../common/types/QuestionData";
import WordData from "../../common/types/WordData";

interface Props {
  questions: QuestionSprintData[];
  wrongAnswers: WordData[];
  correctAnswers: WordData[];
  answerSeries: boolean[];
  setGameEnded: (val: boolean) => void;
}

function SprintItem({
  questions,
  wrongAnswers,
  correctAnswers,
  answerSeries,
  setGameEnded
}: Props): JSX.Element {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [sucBar, setSucBar] = useState(0);
  const [score, setScore] = useState(0);
  const [oper, setOper] = useState(20);

  const audioCorrect = useMemo(() => new Howl({
    src: [`./assets/sounds/correct.mp3`]
  }), []);
  const audioWrong = useMemo(() => new Howl({
    src: [`./assets/sounds/wrong.mp3`]
  }), []);

  const question = questions[currentQuestion];

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setGameEnded(true)
    }
    return () => {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setGameEnded(true)
      }
    }
  }, [seconds, setGameEnded]);

  const clickHandler = useCallback((checkedAnswer: string) => {
    if (checkedAnswer === String(question.answer)) {
      audioCorrect.play();
      correctAnswers.push(question.wordData);
      answerSeries.push(true)
      setScore((prev) => prev + oper)
      if (sucBar === 3) {
        setSucBar(0);
        setOper((prev) => prev * 2)
      } else {
        setSucBar((prev) => prev + 1)
      }
    } else {
      audioWrong.play();
      wrongAnswers.push(question.wordData);
      answerSeries.push(false)
      setSucBar(0)
    }
    if (currentQuestion === questions.length - 1) {
      setGameEnded(true)
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  }, [question, answerSeries, audioCorrect, audioWrong, correctAnswers, wrongAnswers, currentQuestion, questions.length, setGameEnded, setScore, oper, setSucBar, sucBar])

  const keyHandler = useCallback((key: string) => {
    if (key === 'ArrowRight') {
      clickHandler('true')
    } else if (key === 'ArrowLeft') {
      clickHandler('false')
    }
  }, [clickHandler]);

  useEffect(() => {
    document.onkeydown = (e) => {
      e.preventDefault();
      keyHandler(e.key);
    };
    return () => {
      document.onkeydown = (e) => {
        e.preventDefault();
        keyHandler(e.key);
      };
    }
  }, [keyHandler])

  return (
    <div className="flex flex-wrap flex-col items-center sm:min-w-[400px] min-w-[240px] bg-slate-300 rounded-xl p-4 shadow-lg text-slate-700">
      <div className="text-3xl left-28 text-green-700">
        +{oper}
      </div>
      <div className="flex flex-col items-center text-3xl m-5">
        Счет: {score}
      </div>
      <div className="flex justify-center items-center grow p-2 m-2 bg-white rounded-full text-4xl border-slate-700 border-2">
        {seconds > 9 ? seconds : `0${seconds}`}
      </div>
      <div className="flex flex-row justify-center my-5">
        <div className={`w-6 h-6 m-2 ${sucBar > 0 ? 'bg-green-600' : 'bg-white'} rounded-full border-slate-700 border`} />
        <div className={`w-6 h-6 m-2 ${sucBar > 1 ? 'bg-green-600' : 'bg-white'} rounded-full border-slate-700 border`} />
        <div className={`w-6 h-6 m-2 ${sucBar > 2 ? 'bg-green-600' : 'bg-white'} rounded-full border-slate-700 border`} />
      </div>
      <div className="flex flex-col items-center text-4xl sm:px-2">
        {question.word}
      </div>
      <div className="flex flex-col items-center text-3xl sm:px-2">
        {question.question}
      </div>
      <hr className="bg-black h-[2px] my-4" />
      <div className="flex justify-around grow w-full">
        <button className="inline-flex items-center justify-center gap-x-3 w-20 py-1 text-white text-base font-medium 
          rounded-lg border-2 border-transparent bg-red-400 hover:bg-white hover:text-red-400 hover:border-red-400
          focus:outline-none"
          type="button"
          id="false"
          onClick={(e) => clickHandler(e.currentTarget.id)}>
          Неверно
        </button>
        <button className="inline-flex items-center justify-center gap-x-3 w-20 py-1 text-white text-base font-medium 
          rounded-lg border-2 border-transparent bg-green-400 hover:bg-white hover:text-green-400 hover:border-green-400
          focus:outline-none"
          type="button"
          id="true"
          onClick={(e) => clickHandler(e.currentTarget.id)}>
          Верно
        </button></div>
    </div>
  )
}

export default SprintItem