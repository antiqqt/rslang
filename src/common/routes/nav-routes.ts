import {
  faBookBookmark,
  faChartSimple,
  faGamepad,
  faHouse,
  faNoteSticky,
} from '@fortawesome/free-solid-svg-icons';

const navRoutes = {
  main: {
    path: '/',
    icon: faHouse,
    fullName: 'Главная',
  },
  textbook: {
    path: '/textbook',
    icon: faBookBookmark,
    fullName: 'Учебник',
  },
  games: {
    path: '/games',
    icon: faGamepad,
    fullName: 'Игры',
  },
  statistics: {
    path: '/statistics',
    icon: faChartSimple,
    fullName: 'Статистика',
  },
  about: {
    path: '/about',
    icon: faNoteSticky,
    fullName: 'О команде',
  },
};

export default navRoutes;
