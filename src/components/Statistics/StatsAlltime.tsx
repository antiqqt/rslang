import { useState } from 'react';

import { SettingsResponse } from '../../common/types/SettingsData';
import { StatisticResponse } from '../../common/types/StatisticsData';
import ChartProgress from './ChartProgress';
import ChartWordCount from './ChartWordCount';

interface Props {
  totalStats: StatisticResponse;
  settings: SettingsResponse;
}

const ChartsData = {
  progress: {
    type: 'progress',
    name: 'Прогресс изучения',
  },
  wordCount: {
    type: 'wordCount',
    name: 'Кол-во новых слов',
  },
} as const;

export default function StatsAlltime({ totalStats, settings }: Props) {
  const [chart, setChart] = useState<
    typeof ChartsData[keyof typeof ChartsData]
  >(ChartsData.wordCount);

  return (
    <>
      <div className="flex">
        <label
          htmlFor="teal-toggle"
          className="inline-flex relative items-center cursor-pointer"
        >
          <input
            type="checkbox"
            value=""
            id="teal-toggle"
            className="sr-only peer"
            onChange={() =>
              chart.type === 'wordCount'
                ? setChart(ChartsData.progress)
                : setChart(ChartsData.wordCount)
            }
          />
          <div
            className="w-8 h-3 bg-slate-300 rounded-full 
        peer peer-focus:ring-2 peer-focus:ring-slate-400 peer-checked:after:translate-x-full peer-checked:after:bg-blue-400
        after:content-[''] after:absolute after:top-0 after:-left-1 after:bg-slate-300 after:border-slate-400 after:rounded-full after:h-5 after:w-5 after:transition-all 
        "
          />
          <span className="ml-3 text-sm font-medium text-gray-700">
            {chart.name}
          </span>
        </label>
      </div>
      {chart.type === 'wordCount' && <ChartWordCount totalStats={totalStats} />}
      {chart.type === 'progress' && <ChartProgress settings={settings} />}
    </>
  );
}
