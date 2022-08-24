import { Link } from 'react-router-dom'

import AutorizationSvg from './AutorizationSvg'
import BurgerSvg from './BurgerSvg'

function Header(props: {active: boolean, setActive: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element {
  const {active, setActive} = props;
  return (
    <header className="flex justify-between p-3 text-blue-400 w-[100%] h-16">
      <button className="w-10" type="button" onClick={() => setActive(!active)}>
        <BurgerSvg/>
      </button>
      <button className="font-bold text-4xl" type="button">RS Lang</button>
      <Link className="w-10" to="/auth">
        <AutorizationSvg/>
      </Link>
    </header>
  )
}

export default Header;
