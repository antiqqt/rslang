import { useState } from 'react';

import StatsAlltime from './StatsAlltime';
import StatsToday from './StatsToday';

const Screens = {
  today: 'today',
  alltime: 'alltime',
} as const;

export default function Statistics() {
  const [screen, setScreen] = useState<keyof typeof Screens>(Screens.today);

  return (
    <article className="flex flex-col gap-y-4 pt-6 px-4 text-slate-700 font-medium">
      <section className="flex flex-col items-center gap-y-7">
        {screen === Screens.today && (
          <>
            <p className="mx-auto text-4xl font-medium">
              Статистика за сегодня:
            </p>
            <StatsToday />
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
        {screen === Screens.alltime && (
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
