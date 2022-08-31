import { useState } from 'react';

import {
  faBookmark,
  faGraduationCap,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';

import environment from '../../common/environments/environment';
import useAuth from '../../common/hooks/useAuth';
import WordData from '../../common/types/WordData';
import GroupElementData from '../Textbook/GroupElementData';

interface Props {
  data: WordData;
}

export default function Word({
  data: {
    word,
    group,
    image,
    transcription,
    wordTranslate,
    textExample,
    textMeaning,
    textExampleTranslate,
    textMeaningTranslate,
  },
}: Props) {
  const { auth } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article className="flex flex-col max-w-[15.5rem] w-full text-slate-400 bg-slate-200 border-2 border-slate-300 rounded-lg sm:max-w-none md:w-3/5 lg:w-full lg:flex-row lg:max-w-5xl">
      <div className="w-full overflow-hidden border-b-2 border-slate-300 rounded-t-lg lg:max-w-xs lg:rounded-none lg:rounded-l-lg lg:border-b-0 lg:border-r-2">
        <img
          alt={`${word} illustration`}
          className="block w-full h-full object-cover"
          src={`${environment.baseUrl}/${image}`}
        />
      </div>
      <section className="flex flex-col px-4 pt-2 pb-3 gap-y-1 md:justify-around md:flex-1">
        <p className="text-3xl leading-none text-slate-600 capitalize">
          {word}
        </p>
        <div className="flex flex-col items-baseline pt-1 gap-x-2 text-slate-400 text-xl sm:flex-row">
          <p className="capitalize">{wordTranslate}</p>-<p>{transcription}</p>
        </div>
        <p className="pt-3 text-base text-slate-600 text-justify">
          {parse(textExample)}
        </p>
        <p className="text-base text-justify">{`${parse(
          textExampleTranslate
        )}.`}</p>
        <p className="pt-3 text-base text-slate-600 text-justify">
          {parse(textMeaning)}
        </p>
        <p className="text-base text-justify">{`${parse(
          textMeaningTranslate
        )}.`}</p>
        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          className="inline-flex items-center justify-center w-10 h-10 mx-auto mt-2
          rounded-full border-2 border-transparent bg-slate-300 hover:border-slate-400"
        >
          <FontAwesomeIcon
            icon={isPlaying ? faPause : faPlay}
            style={{ color: GroupElementData[group].color }}
            className={isPlaying ? 'pl-0' : 'pl-1'}
          />
        </button>
        {auth && (
          <div className="flex flex-col justify-center items-center gap-y-2 pt-3 sm:flex-row sm:gap-x-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-x-2 max-w-max px-3 py-1 text-slate-700 
            text-base font-medium rounded-lg border-2 border-transparent bg-slate-300 hover:border-slate-400"
            >
              <FontAwesomeIcon
                icon={faBookmark}
                style={{ color: GroupElementData[group].color }}
                className="w-5 h-5"
              />
              В сложные
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-x-2 max-w-max px-3 py-1 text-slate-700 
            text-base font-medium rounded-lg border-2 border-transparent bg-slate-300 hover:border-slate-400"
            >
              <FontAwesomeIcon
                icon={faGraduationCap}
                style={{ color: GroupElementData[group].color }}
                className="w-6 h-6"
              />
              В изученные
            </button>
          </div>
        )}
      </section>
    </article>
  );
}
