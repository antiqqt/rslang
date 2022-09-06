import { useEffect, useState } from 'react';

import textbookConstants from '../../common/constants/tb-constants';
import useAuth from '../../common/hooks/useAuth';
import useSafeRequest from '../../common/hooks/useSafeRequest';
import { AggregatedWords } from '../../common/types/AggregatedWordData';
import { SettingsResponse } from '../../common/types/SettingsData';
import {
  StatisticData,
  StatisticResponse,
} from '../../common/types/StatisticsData';
import {
  createFilteredURL,
  createSettingsURL,
  createStatsURL,
} from '../../common/utilities/Utilities';
import StatsAlltime from './StatsAlltime';
import StatsToday from './StatsToday';

const Screens = {
  today: 'today',
  alltime: 'alltime',
} as const;

export const defaultStats = {
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
  const safeRequest = useSafeRequest();

  const [todayStats, setTodayStats] = useState<StatisticData | null>(null);
  const [totalStats, setTotalStats] = useState<StatisticResponse | null>(null);
  const [settings, setSettings] = useState<SettingsResponse | null>(null);
  const [newLearnedWords, setNewLearnedWords] = useState<number | null>(null);

  useEffect(() => {
    if (!auth) return;
    if (settings !== null) return;
    const today = new Date().toLocaleDateString('en-ca');

    const loadStats = async () => {
      const statsRes = await safeRequest.get<StatisticResponse>(
        createStatsURL(auth.userId),
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (statsRes.data.optional && today in statsRes.data.optional) {
        setTodayStats(statsRes.data.optional[today]);
        setTotalStats(statsRes.data);
        return;
      }

      await safeRequest.put<StatisticResponse>(
        createStatsURL(auth.userId),
        {
          learnedWords: statsRes.data.learnedWords,
          optional: {
            ...statsRes.data.optional,
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
      setTodayStats(defaultStats);
      setTotalStats({
        learnedWords: statsRes.data.learnedWords,
        optional: {
          ...statsRes.data.optional,
          [today]: {
            ...defaultStats,
          },
        },
      });
    };

    const loadSettings = async () => {
      const filteredRes = await safeRequest.get<AggregatedWords>(
        createFilteredURL(auth.userId, textbookConstants.LEARNED_WORDS_QUERY),
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const currentLearnedWordsCount =
        filteredRes.data[0].paginatedResults.length;
      setNewLearnedWords(currentLearnedWordsCount);

      const settingsRes = await safeRequest.get<SettingsResponse>(
        createSettingsURL(auth.userId),
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const newSettings = {
        optional: {
          ...settingsRes.data.optional,
          [today]: {
            learnedWords: currentLearnedWordsCount,
          },
        },
      };

      await safeRequest.put<SettingsResponse>(
        createSettingsURL(auth.userId),
        newSettings,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setSettings(newSettings);
    };

    try {
      loadStats();
      loadSettings();
    } catch (error) {
      console.error(error);
    }
  }, [auth, safeRequest, settings]);

  return (
    <article className="flex flex-col gap-y-4 pt-6 px-4 text-slate-700 font-medium">
      <section className="flex flex-col items-center gap-y-7">
        {screen === Screens.today && todayStats && newLearnedWords && (
          <>
            <p className="mx-auto text-4xl font-medium">
              Статистика за сегодня:
            </p>
            <StatsToday
              todayStats={todayStats}
              newLearnedWords={newLearnedWords}
            />
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
        {screen === Screens.alltime && settings && totalStats && (
          <>
            <p className="mx-auto text-4xl font-medium">
              Статистика за всё время:
            </p>
            <StatsAlltime settings={settings} totalStats={totalStats} />
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
