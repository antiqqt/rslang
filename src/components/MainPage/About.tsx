import AboutItem from './AboutItem';

function About() {
  const cards = [
    {
      id: 1,
      name: 'Anton Pomogaev',
      img: 'Anton.jpg',
      jobTitle: 'Team leader, Frontend developer',
      activity: 'Сделал базовые настройки приложения, базовая верстку, авторизацию, усебник и списки слов, раздел статистики. Тимлид команды.',
      url: 'https://github.com/antiqqt',
    },
    {
      id: 2,
      name: 'Konstantinksh',
      img: 'Kosta.jpg',
      jobTitle: 'Frontend developer',
      activity: 'Сделал игру Аудиовызов, главную страницу, меню, помогал с игрой Спринт. Реализовал логику смены категорий сложности слов.',
      url: 'https://github.com/Konstantinksh',
    },
    {
      id: 3,
      name: 'MikhailPakaliuk',
      img: 'Michael.jpg',
      jobTitle: 'Frontend developer',
      activity: 'Частично сделал игру Спринт, страницу о команде и домашнюю страницу с преимуществами приложения.',
      url: 'https://github.com/MikhailPakaliuk',
    }
  ];

  return (
    <section className="pt-5 pb-5">
    <h2 className="mx-auto text-slate-700 text-4xl font-medium my-4 text-center">О команде</h2>
      {cards.map((card) =>
        <AboutItem post={card} key={card.id} img={card.img} />
      )}
    </section>
  );
}

export default About;
