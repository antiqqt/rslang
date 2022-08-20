import {
  Link,
} from "react-router-dom";

function NavBar(): JSX.Element {
  return (
    <aside className="mx-10 text-xl">
      <nav>
        <ul>
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
