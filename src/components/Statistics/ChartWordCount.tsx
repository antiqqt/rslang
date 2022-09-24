import { Line } from 'react-chartjs-2';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

import { StatisticResponse } from '../../common/types/StatisticsData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

interface Props {
  totalStats: StatisticResponse;
}

export default function ChartWordCount({ totalStats }: Props) {
  const dates = totalStats.optional;
  const newWordsPerDay = Object.values(dates).map(
    (date) => date.audiochallenge.newWordsCount + date.sprint.newWordsCount
  );

  const data = {
    labels: [...Object.keys(dates)],
    datasets: [
      {
        label: 'Кол-во новых слов',
        data: newWordsPerDay,
        borderColor: '#60a5fa',
        backgroundColor: '#3b82f6',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
