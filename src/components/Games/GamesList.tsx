import { Link } from 'react-router-dom';

import Routes from '../../common/routes/games-routes';

function GamesList(): JSX.Element {
  return (
    <article className="flex flex-col gap-y-6 h-full w-full px-3 py-8 font-medium text-2xl text-white">
      <h2 className="mx-auto text-slate-700 text-4xl font-medium">Игры</h2>
      <nav className="flex pt-2 grow">
        <ul className="flex flex-wrap justify-center px-2 z-10 grow">
          {Object.values(Routes).map(({ path, img, fullName }) => (
            <li key={fullName} className="flex items-center justify-center 
            w-full h-44 max-w-md m-4 overflow-hidden
            rounded-lg hover:shadow-xl shadow-red hover:scale-105 transition-all">
              <button className='flex grow h-full' type="button">
                <Link to={path} className='flex flex-col grow h-full justify-center align-middle bg-cover bg-center' 
                style={{ backgroundImage: `url(./assets/img/${img})` }}>
                  <div className='text-3xl'>
                    {fullName}
                  </div>
                </Link>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  )
}

export default GamesList