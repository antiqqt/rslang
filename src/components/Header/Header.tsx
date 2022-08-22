import AutorizationSvg from './AutorizationSvg'
import BurgerSvg from './BurgerSvg'

function Header(): JSX.Element {
  return (
    <header className="flex justify-between p-3 text-blue-400 w-[100%] h-16">
      <button className="w-10" type="button">
        <BurgerSvg/>
      </button>
      <button className="font-bold text-4xl" type="button">RS Lang</button>
      <button className="w-10" type="button">
        <AutorizationSvg/>
      </button>
    </header>
  )
}

export default Header
