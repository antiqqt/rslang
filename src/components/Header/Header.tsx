import AutorizationSvg from './AutorizationSvg'
import BurgerSvg from './BurgerSvg'

function Header(): JSX.Element {
  return (
    <header className="flex justify-between px-3 pt-8 text-blue-400">
      <button className="w-10" type="button">
        <BurgerSvg/>
      </button>
      <button className="font-bold text-5xl" type="button">RS Lang</button>
      <button className="w-10" type="button">
        <AutorizationSvg/>
      </button>
    </header>
  )
}

export default Header
