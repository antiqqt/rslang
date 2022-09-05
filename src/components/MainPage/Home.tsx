import { useState } from 'react';

import HomeItem from './HomeItem';

function Home() {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Учебник',
      paragraph: 'Электронный учебник состоит из шести разделов. В каждом разделе 30 страниц по 20 слов. Представлены перевод слова, тематическое изображение, а также произношение как слова отдельно, так и в составе словосочетания.',
      img:'./assets/img/textbook.jpg',
    },
    {
      id: 3,
      title: 'Игры',
      paragraph: 'Для изучения слов и закрепления запоминания в приложении есть 2 игры: Sprint и Audio Chalenge которые помогут вам в игровой форме «прокачать» словарный запас.',
      img:'./assets/img/gaming.jpg',
    },
    {
      id: 4,
      title: 'Статистика',
      paragraph: 'Весь прогресс обучения можно посмотреть в статистике, где представлены данные как за текущий день, так и за весь период обучения. Информация представлена ​​как в виде таблицы, так и в виде графиков, что очень удобно.',
      img:'./assets/img/statistics.jpg',
    }
  ]);
  
  return (
    <section>
      <h1 className="font-medium text-slate-700/600 pt-3 pb-2 text-center text-4xl" >Преимущества приложения</h1>
      <p className=" font-medium text-slate-700/600 pb-4 text-center text-2xl pb-30" >Зарегистрируйтесь, чтобы использовать все возможности</p>
      <section className="pt-5 pb-5 flex max-w-4xl flex-wrap justify-around items-stretch content-around">
        {cards.map((card) =>
          <HomeItem post={card} key={card.id} />
        )}
      </section>
    </section>
  );
}

export default Home;