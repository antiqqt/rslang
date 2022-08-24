import {
  Link,
} from "react-router-dom";

function NavBar(props: { active: boolean }): JSX.Element {
  const { active } = props;
  return (
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    <aside className={`${"px-3 text-2xl bg-slate-400 transition-all"} ${active ? "w-56" : "w-16"}`} onClick={e => e.stopPropagation()}>
      <nav className="flex">
        <ul className="flex h-[30vh] flex-col justify-around mx-3 z-10">
          <li>
            <Link to="/">Гл</Link>
          </li>
          <li>
            <Link to="/textbook">Уч</Link>
          </li>
          <li>
            <Link to="/dictionary">Сл</Link>
          </li>
          <li>
            <Link to="/games">Иг</Link>
          </li>
          <li>
            <Link to="/statistic">Ст</Link>
          </li>
          <li>
            <Link to="/about">О</Link>
          </li>
        </ul>
        <ul className="flex h-[30vh] flex-col justify-around mx-3">
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/textbook">Учебник</Link>
          </li>
          <li>
            <Link to="/dictionary">Словарь</Link>
          </li>
          <li>
            <Link to="/games">Игры</Link>
          </li>
          <li>
            <Link to="/statistic">Статистика</Link>
          </li>
          <li>
            <Link to="/about">О команде</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default NavBar
