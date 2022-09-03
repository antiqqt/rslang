import {
  faBookmark,
  faCheck,
  faCheckDouble,
  faFlagCheckered,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Games = {
  Audiochallenge: {
    name: 'Аудиовызов',
    icon: faMusic,
  },
  Sprint: {
    name: 'Спринт',
    icon: faFlagCheckered,
  },
};

export default function StatsToday() {
  return (
    <>
      <section className="flex flex-col gap-x-6 gap-y-4 sm:flex-row">
        <div className="flex flex-col items-center gap-y-1">
          <span className="text-7xl font-bold">0</span>
          <p className="text-xl text-justify">новых слов изучено</p>
        </div>
        <div className="flex flex-col items-center gap-y-1">
          <span className="text-7xl font-bold">0%</span>
          <p className="text-xl text-justify">правильных ответов</p>
        </div>
      </section>
      <section className="flex flex-col gap-y-5 sm:flex-row sm:gap-x-8">
        {Object.values(Games).map(({ name, icon }) => (
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
              <p className="text-sm font-medium">Изучено 0 новых слов.</p>
            </div>
            <div className="flex items-center gap-x-2">
              <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
              <p className="text-sm">Правильных ответов: 0%.</p>
            </div>
            <div className="flex items-center gap-x-2">
              <FontAwesomeIcon icon={faCheckDouble} className="w-4 h-4" />
              <p className="text-sm">
                Самая длинная серия правильных ответов: 0.
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
