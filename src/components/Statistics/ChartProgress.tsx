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

import { SettingsResponse } from '../../common/types/SettingsData';

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
  settings: SettingsResponse;
}

export default function ChartProgress({ settings }: Props) {
  const dates = settings.optional;
  const newLearnedWordsPerDay = Object.values(dates).map(
    (date) => date.learnedWords
  );

  const data = {
    labels: [...Object.keys(dates)],
    datasets: [
      {
        label: 'Прогресс изучения',
        data: newLearnedWordsPerDay,
        borderColor: '#34d399',
        backgroundColor: '#10b981',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
