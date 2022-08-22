import {
  Link,
} from "react-router-dom";

function NavBar(): JSX.Element {
  return (
    <aside className="px-3 text-2xl bg-slate-400">
      <nav className="min-h-[50%]">
        <ul className="flex h-[100%] flex-col justify-around px-5">
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
        </ul>
      </nav>
    </aside>
  )
}

export default NavBar
