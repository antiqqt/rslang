import { useState } from 'react';

import parse from 'html-react-parser';

import environment from '../../common/environments/environment';
import WordData from '../../common/types/WordData';
import PauseIcon from './PauseIcon';
import PlayIcon from './PlayIcon';

interface Props {
  data: WordData;
}

export default function Word({
  data: {
    word,
    image,
    transcription,
    wordTranslate,
    textExample,
    textMeaning,
    textExampleTranslate,
    textMeaningTranslate,
  },
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article className="flex flex-col w-full bg-blue-100 rounded-lg text-blue-400 md:w-3/5 lg:w-full lg:flex-row lg:max-w-5xl">
      <img
        alt={`${word} illustration`}
        className="block w-auto h-auto rounded-t-lg lg:max-w-xs lg:rounded-none lg:rounded-l-lg"
        src={`${environment.baseUrl}/${image}`}
      />
      <section className="flex flex-col px-4 pt-2 pb-3 md:justify-around md:flex-1">
        <div className="flex gap-x-6 items-center">
          <div className="flex items-center h-full">
            <p className="text-2xl leading-none h-full">
              {word} - {transcription}
            </p>
          </div>
          {isPlaying ? (
            <button
              className="fill-blue-400"
              onClick={() => setIsPlaying(false)}
              type="button"
            >
              <PauseIcon />
            </button>
          ) : (
            <button
              className="fill-blue-400"
              onClick={() => setIsPlaying(true)}
              type="button"
            >
              <PlayIcon />
            </button>
          )}
        </div>
        <p className="text-base text-gray-400 font-normal">
          {`"${wordTranslate}"`}
        </p>
        <p className="pt-2 text-base">{parse(textExample)}</p>
        <p className="pt-1 text-base text-gray-400">{`${parse(
          textExampleTranslate
        )}.`}</p>
        <p className="pt-3 text-base">{parse(textMeaning)}</p>
        <p className="pt-1 text-base text-gray-400">
          {`${parse(textMeaningTranslate)}.`}
        </p>
      </section>
    </article>
  );
}
