import { useEffect, useState } from 'react';

import apiPaths from '../../common/api/api-paths';
import environment from '../../common/environment/environment';
import useAuth from '../../common/hooks/useAuth';
import useSafeRequest from '../../common/hooks/useSafeRequest';
import {
  StatisticData,
  StatisticResponse,
} from '../../common/types/StatisticsData';
import StatsAlltime from './StatsAlltime';
import StatsToday from './StatsToday';

const Screens = {
  today: 'today',
  alltime: 'alltime',
} as const;

const defaultStats = {
  sprint: {
    bestSeries: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    newLearnedWordsCount: 0,
    newHardWordsCount: 0,
    newEasyWordsCount: 0,
    newWordsCount: 0,
  },
  audiochallenge: {
    bestSeries: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    newLearnedWordsCount: 0,
    newHardWordsCount: 0,
    newEasyWordsCount: 0,
    newWordsCount: 0,
  },
};

export default function Statistics() {
  const [screen, setScreen] = useState<typeof Screens[keyof typeof Screens]>(
    Screens.today
  );

  const { auth } = useAuth();
  const [stats, setStats] = useState<StatisticData | null>(null);

  const safeRequest = useSafeRequest();

  useEffect(() => {
    if (!auth) return;

    const loadStats = async () => {
      try {
        const today = new Date().toLocaleDateString('en-ca');

        const { data: resData } = await safeRequest.get<StatisticResponse>(
          `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.Statistics}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        if (resData.optional && today in resData.optional) {
          setStats(resData.optional[today]);
          return;
        }

        await safeRequest.put<StatisticResponse>(
          `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.Statistics}`,
          {
            learnedWords: resData.learnedWords,
            optional: {
              [today]: {
                ...defaultStats,
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setStats(defaultStats);
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, [auth, safeRequest]);

  return (
    <article className="flex flex-col gap-y-4 pt-6 px-4 text-slate-700 font-medium">
      <section className="flex flex-col items-center gap-y-7">
        {screen === Screens.today && stats && (
          <>
            <p className="mx-auto text-4xl font-medium">
              Статистика за сегодня:
            </p>
            <StatsToday stats={stats} />
            <button
              onClick={() => setScreen(Screens.alltime)}
              type="button"
              className="inline-flex items-center justify-center gap-x-2 max-w-max px-3 py-1 text-slate-700 
        text-base font-medium rounded-lg border-2 border-transparent bg-slate-300 hover:border-slate-400"
            >
              Посмотреть за всё время
            </button>
          </>
        )}
        {screen === Screens.alltime && stats && (
          <>
            <p className="mx-auto text-4xl font-medium">
              Статистика за всё время:
            </p>
            <StatsAlltime />
            <button
              onClick={() => setScreen(Screens.today)}
              type="button"
              className="inline-flex items-center justify-center gap-x-2 max-w-max px-3 py-1 text-slate-700 
        text-base font-medium rounded-lg border-2 border-transparent bg-slate-300 hover:border-slate-400"
            >
              Посмотреть за сегодня
            </button>
          </>
        )}
      </section>
    </article>
  );
}
