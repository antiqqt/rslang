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
    <section>
      <section className="flex flex-wrap justify-around mx-5">
        <div className="flex flex-wrap content-start justify-start max-w-sm">
          <h1 className="font-medium pb-2 text-slate-900 my-4">RS Lang</h1>
          <p className="font-medium text-sm text-slate-600">
            Запоминание английских слов может быть увлекательным и сложным.
            Играйте в игры, слушайте произношение, совершенствуйте свои знания.
            С нашим приложением обучение становится радостью.
          </p>
        </div>
        <div
          className="flex justify-center grow shrink min-w-[50%] space-x-4 font-medium bg-contain bg-no-repeat h-80 bg-center"
          style={{
            backgroundImage: `url(./assets/img/main.png)`,
          }}
        />
      </section>
      <section>
        <h2 className="font-medium text-slate-700/600 pt-3 pb-2 text-center text-4xl mx-4">
          Преимущества приложения
        </h2>
        <p className=" font-medium text-slate-700/600 pb-4 text-center text-2xl pb-30 mx-4">
          Зарегистрируйтесь, чтобы использовать все возможности
        </p>
        <section className="pt-5 pb-5 mx-4 flex max-w-4xl flex-wrap justify-around items-stretch content-around">
          {cards.map((card) => (
            <HomeItem post={card} key={card.id} />
          ))}
        </section>
      </section>
    </section>
  );
}

export default Home;
