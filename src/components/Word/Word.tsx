import { useState } from 'react';

import {
  faGraduationCap,
  faSkull,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Howl } from 'howler';
import parse from 'html-react-parser';

import textbookConstants from '../../common/constants/tb-constants';
import environment from '../../common/environment/environment';
import useAuth from '../../common/hooks/useAuth';
import useAxiosSecure from '../../common/hooks/useAxiosSecure';
import WordData from '../../common/types/WordData';
import GroupElementData from '../Textbook/GroupElementData';
import WordBtn from './WordBtn';
import { handleAudio, handleWord } from './WordHandlers';

interface Props {
  data: WordData;
  setUserWord: React.Dispatch<React.SetStateAction<string>>;
  currentGroup: number;
}

export default function Word({
  currentGroup,
  setUserWord,
  data: {
    userWord,
    _id,
    word,
    group,
    image,
    transcription,
    wordTranslate,
    textExample,
    textMeaning,
    textExampleTranslate,
    textMeaningTranslate,
    audio,
    audioExample,
    audioMeaning,
  },
}: Props) {
  const { auth } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [difficulty, setDifficulty] = useState(userWord?.difficulty);

  const [audioSound, setAudioSound] = useState<Howl | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const [exampleSound, setExampleSound] = useState<Howl | null>(null);
  const [examplePlaying, setExamplePlaying] = useState(false);

  const [meaningSound, setMeaningSound] = useState<Howl | null>(null);
  const [meaningPlaying, setMeaningPlaying] = useState(false);

  return (
    <article className="flex flex-col max-w-[15.5rem] w-full text-slate-400 bg-slate-200 border-2 border-slate-300 rounded-lg sm:max-w-none sm:w-3/5 lg:w-full lg:flex-row lg:max-w-5xl">
      <div className="w-full overflow-hidden border-b-2 border-slate-300 rounded-t-lg lg:max-w-xs lg:rounded-none lg:rounded-l-lg lg:border-b-0 lg:border-r-2">
        <img
          alt={`${word} illustration`}
          className="block w-full h-full object-cover"
          src={`${environment.baseUrl}/${image}`}
        />
      </div>
      <section className="flex flex-col px-4 pt-2 pb-3 gap-y-1 md:justify-around md:flex-1">
        <div className="flex gap-x-4 items-center">
          <p className="text-3xl leading-none text-slate-600 capitalize">
            {word}
          </p>
          <button
            onClick={() =>
              handleAudio(
                `${environment.baseUrl}/${audio}`,
                audioPlaying,
                audioSound,
                setAudioPlaying,
                setAudioSound
              )
            }
            type="button"
            className="inline-flex items-center justify-center w-6 h-6 mt-2
          rounded-full border-2 border-transparent bg-slate-300 hover:border-slate-400"
          >
            <FontAwesomeIcon
              icon={audioPlaying ? faVolumeXmark : faVolumeHigh}
              className="w-4 h-4"
            />
          </button>
        </div>
        <div className="flex flex-col items-baseline pt-1 gap-x-2 text-slate-400 text-xl sm:flex-row">
          <p className="pt-1 gap-x-2 text-slate-400 text-xl capitalize">
            {wordTranslate}
          </p>
          -<p>{transcription}</p>
        </div>
        <div className="flex justify-between items-center pt-3 lg:justify-start lg:gap-4">
          <p className="w-5/6 text-base text-slate-600 text-justify lg:w-auto lg:text-left ">
            {parse(textExample)}
          </p>
          <button
            type="button"
            onClick={() =>
              handleAudio(
                `${environment.baseUrl}/${audioExample}`,
                examplePlaying,
                exampleSound,
                setExamplePlaying,
                setExampleSound
              )
            }
            className="inline-flex items-center justify-center w-6 h-6
          rounded-full border-2 border-transparent bg-slate-300 hover:border-slate-400"
          >
            <FontAwesomeIcon
              icon={examplePlaying ? faVolumeXmark : faVolumeHigh}
              className="w-4"
            />
          </button>
        </div>
        <p className="text-base text-justify">{`${parse(
          textExampleTranslate
        )}.`}</p>
        <div className="flex items-center justify-between pt-3 lg:justify-start lg:gap-4">
          <p className="w-5/6 text-base text-slate-600 text-justify lg:w-auto lg:text-left">
            {parse(textMeaning)}
          </p>
          <button
            onClick={() =>
              handleAudio(
                `${environment.baseUrl}/${audioMeaning}`,
                meaningPlaying,
                meaningSound,
                setMeaningPlaying,
                setMeaningSound
              )
            }
            type="button"
            className="inline-flex items-center justify-center w-6 h-6
          rounded-full border-2 border-transparent bg-slate-300 hover:border-slate-400"
          >
            <FontAwesomeIcon
              icon={meaningPlaying ? faVolumeXmark : faVolumeHigh}
              className="w-4"
            />
          </button>
        </div>
        <p className="text-base text-justify">{`${parse(
          textMeaningTranslate
        )}.`}</p>
        {auth && (
          <>
            <div className="flex flex-col justify-center items-center gap-y-2 pt-3 sm:flex-row sm:gap-x-3">
              {!difficulty && (
                <>
                  <WordBtn
                    handleAction={() => {
                      if (!_id) return;
                      handleWord(_id, axiosSecure, auth, 'create', 'hard');
                      setDifficulty('hard');
                      setUserWord(word);
                    }}
                    icon={faSkull}
                    text="В сложные"
                  />
                  <WordBtn
                    handleAction={() => {
                      if (!_id) return;
                      handleWord(_id, axiosSecure, auth, 'create', 'learned');
                      setDifficulty('learned');
                    }}
                    icon={faGraduationCap}
                    text="В изученные"
                  />
                </>
              )}
              {difficulty === 'learned' && (
                <WordBtn
                  handleAction={() => {
                    if (!_id) return;
                    handleWord(_id, axiosSecure, auth, 'update', 'hard');
                    setDifficulty('hard');
                    setUserWord(_id);
                  }}
                  icon={faSkull}
                  text="В сложные"
                />
              )}
              {difficulty === 'hard' &&
                currentGroup !== textbookConstants.HARD_WORDS_GROUP_NUM && (
                  <WordBtn
                    handleAction={() => {
                      if (!_id) return;
                      handleWord(_id, axiosSecure, auth, 'update', 'learned');
                      setDifficulty('learned');
                      setUserWord(_id);
                    }}
                    icon={faGraduationCap}
                    text="В изученные"
                  />
                )}
              {difficulty === 'hard' &&
                currentGroup === textbookConstants.HARD_WORDS_GROUP_NUM && (
                  <WordBtn
                    handleAction={() => {
                      if (!_id) return;
                      handleWord(_id, axiosSecure, auth, 'delete', 'hard');
                      setDifficulty('hard');
                      setUserWord(_id);
                    }}
                    icon={faSkull}
                    text="Убрать из сложных"
                  />
                )}
            </div>
            {difficulty && (
              <div className="flex justify-center items-center pt-3">
                {difficulty === 'hard' && (
                  <FontAwesomeIcon
                    icon={faSkull}
                    style={{ color: GroupElementData[group].color }}
                  />
                )}
                {difficulty === 'learned' && (
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    style={{ color: GroupElementData[group].color }}
                  />
                )}
              </div>
            )}
          </>
        )}
      </section>
    </article>
  );
}
