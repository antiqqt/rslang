import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import environment from '../../common/environment/environment';
import useLearnedWords from '../../common/hooks/useLearnedWords';
import appRoutes from '../../common/routes/app-routes';
import GamesData from '../../common/routes/games-routes';
import WordData from '../../common/types/WordData';
import AudioButton from './AudioButton';

interface Props {
  wrongAnswers: WordData[];
  correctAnswers: WordData[];
  answerSeries: boolean[];
  setRefresh: (val: boolean) => void;
  gameName: keyof typeof GamesData;
}

function GameResult({
  wrongAnswers,
  correctAnswers,
  answerSeries,
  setRefresh,
  gameName,
}: Props): JSX.Element {
  useEffect(() => {
    const audioFin = new Audio(`./assets/sounds/fin.mp3`);
    audioFin.play();
  }, []);

  useLearnedWords(wrongAnswers, correctAnswers, answerSeries, gameName);

  return (
    <div className="flex flex-col grow p-4 m-4 bg-white shadow-2xl rounded-lg">
      <div className="mx-auto text-gray-700 text-3xl pb-4 text-center">
        Результаты игры:
      </div>
      <div className="flex flex-col sm:flex-row max-h-[50vh] justify-between md:max-h-[65vh] overflow-y-auto">
        <div className="flex flex-col justify-start m-2">
          <div className="mx-auto text-green-500 text-xl p-4 text-center">
            Знаю: {correctAnswers.length}
          </div>
          <div className="flex flex-col flex-wrap">
            {correctAnswers.map((word) => (
              <div className="flex items-center py-2" key={word.word}>
                <AudioButton
                  src={`${environment.baseUrl}/${word.audio}`}
                  size="text-xl"
                />
                <span className="text-xl px-2 text-green-500 ">
                  {word.word}
                </span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="flex flex-col justify-start m-2">
          <div className="mx-auto text-red-500 w-full text-xl p-4 text-center">
            Ошибок: {wrongAnswers.length}
          </div>
          <div>
            {wrongAnswers.map((word) => (
              <div className="flex items-center py-2" key={word.word}>
                <AudioButton
                  src={`${environment.baseUrl}/${word.audio}`}
                  size="text-xl"
                />
                <span className="text-xl px-2 text-red-500 ">{word.word}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <button
          className="inline-flex items-center justify-center gap-x-3 max-w-max p-3 m-1 md:m-3 py-1 text-slate-700 text-base font-medium 
          rounded-lg border-2 border-transparent bg-slate-300  hover:border-slate-400
          focus:outline-none"
          type="button"
          onClick={() => setRefresh(true)}
        >
          Играть еще
        </button>
        <button
          className="inline-flex items-center justify-center gap-x-3 max-w-max p-3 m-1 md:m-3 py-1 text-slate-700 text-base font-medium 
          rounded-lg border-2 border-transparent bg-slate-300  hover:border-slate-400
          focus:outline-none"
          type="button"
        >
          <Link to={appRoutes.Games}>К списку игр</Link>
        </button>
      </div>
    </div>
  );
}

export default GameResult;
