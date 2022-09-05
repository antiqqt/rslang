import {
  faBookmark,
  faCheck,
  faCheckDouble,
  faFlagCheckered,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StatisticData } from '../../common/types/StatisticsData';
import { getPercentage } from '../../common/utilities/Utilities';

interface Props {
  stats: StatisticData;
}

const Games = {
  Audiochallenge: {
    name: 'Аудиовызов',
    icon: faMusic,
    statsKey: 'audiochallenge',
  },
  Sprint: {
    name: 'Спринт',
    icon: faFlagCheckered,
    statsKey: 'sprint',
  },
};

export default function StatsToday({ stats }: Props) {
  const {
    [Games.Audiochallenge.statsKey]: audiochallengeStats,
    [Games.Sprint.statsKey]: sprintStats,
  } = stats;

  const totalAns =
    audiochallengeStats.correctAnswers +
    audiochallengeStats.wrongAnswers +
    sprintStats.correctAnswers +
    sprintStats.wrongAnswers;

  const rightAns = getPercentage(
    audiochallengeStats.correctAnswers + sprintStats.correctAnswers,
    totalAns
  ).toFixed();

  const newWords =
    audiochallengeStats.newWordsCount + sprintStats.newWordsCount;

  return (
    <>
      <section className="flex flex-col gap-x-6 gap-y-4 sm:flex-row">
        <div className="flex flex-col items-center gap-y-1">
          <span className="text-7xl font-bold">{newWords}</span>
          <p className="text-xl text-justify">новых слов изучено</p>
        </div>
        <div className="flex flex-col items-center gap-y-1">
          <span className="text-7xl font-bold">{rightAns}%</span>
          <p className="text-xl text-justify">правильных ответов</p>
        </div>
      </section>
      <section className="flex flex-col gap-y-5 sm:flex-row sm:gap-x-8">
        {Object.values(Games).map(({ name, icon, statsKey }) => {
          const { newWordsCount, bestSeries, correctAnswers, wrongAnswers } =
            stats[statsKey];

          const totalGameAns = correctAnswers + wrongAnswers;
          const rightGameAns = getPercentage(
            correctAnswers,
            totalGameAns
          ).toFixed();

          return (
            <div
              key={name}
              className="flex flex-col gap-y-3 px-3 py-2 bg-slate-200 border-2 border-slate-300 rounded"
            >
              <div className="flex justify-between pb-1 border-b-2 border-slate-300">
                <p className="text-xl">{name}</p>
                <FontAwesomeIcon icon={icon} className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-x-2">
                <FontAwesomeIcon icon={faBookmark} className="w-4 h-4" />
                <p className="text-sm font-medium">
                  Изучено {newWordsCount} новых слов.
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
                <p className="text-sm">Правильных ответов: {rightGameAns}%.</p>
              </div>
              <div className="flex items-center gap-x-2">
                <FontAwesomeIcon icon={faCheckDouble} className="w-4 h-4" />
                <p className="text-sm">
                  Самая длинная серия правильных ответов: {bestSeries}.
                </p>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
