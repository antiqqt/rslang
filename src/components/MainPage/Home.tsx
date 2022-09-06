import HomeItem from './HomeItem';

function Home() {
  const cards = [
    {
      id: 1,
      title: 'Учебник',
      paragraph:
        'Электронный учебник состоит из шести разделов. В каждом разделе 30 страниц по 20 слов. Представлены перевод слова, тематическое изображение, а также произношение как слова отдельно, так и в составе словосочетания.',
      img: './assets/img/textbook.jpg',
    },
    {
      id: 3,
      title: 'Игры',
      paragraph:
        'Для изучения слов и закрепления запоминания в приложении есть 2 игры: Sprint и Audio Chalenge которые помогут вам в игровой форме «прокачать» словарный запас.',
      img: './assets/img/gaming.jpg',
    },
    {
      id: 4,
      title: 'Статистика',
      paragraph:
        'Весь прогресс обучения можно посмотреть в статистике, где представлены данные как за текущий день, так и за весь период обучения. Информация представлена ​​как в виде таблицы, так и в виде графиков, что очень удобно.',
      img: './assets/img/statistics.jpg',
    },
  ];

  return (
    <section className="flex flex-col items-center gap-y-6 w-full px-3">
      <section className="flex flex-col items-center gap-y-6 pt-4 sm:flex-row sm:justify-around sm:px-6 ">
        <div className="flex flex-col items-center gap-y-7 justify-start max-w-sm">
          <h1 className="font-bold text-6xl text-slate-700 text-center md:text-7xl">
            RS Lang
          </h1>
          <p className="font-medium text-base text-slate-600 lg:text-lg">
            Запоминание английских слов может быть увлекательным и сложным.
            Играйте в игры, слушайте произношение, совершенствуйте свои знания.
            С нашим приложением обучение становится
            <span className="italic text-slate-700"> радостью</span> .
          </p>
        </div>
        <div className="max-w-xs font-medium sm:max-w-lg">
          <img
            src="./assets/img/main.png"
            alt="main-logo"
            className="w-full h-full"
          />
        </div>
      </section>
      <section className="flex flex-col items-center">
        <h2 className="font-bold text-slate-600 max-w-sm p-2 pt-3 text-center text-4xl">
          Преимущества приложения
        </h2>
        <section className="pt-5 pb-5 flex max-w-4xl flex-wrap justify-around items-stretch content-around">
          {cards.map((card) => (
            <HomeItem post={card} key={card.id} />
          ))}
        </section>
      </section>
    </section>
  );
}

export default Home;
