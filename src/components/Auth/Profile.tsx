import { FormEvent } from 'react';

import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useAuth from '../../common/hooks/useAuth';
import useSignout from '../../common/hooks/useSignout';

export default function Profile() {
  const { auth } = useAuth();
  const signout = useSignout();

  const handleSignout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signout) signout();
  };

  return (
    <section className="flex flex-col gap-y-4 w-full h-fit mx-auto py-4 px-2 text-base text-slate-700 font-medium rounded sm:mt-8 sm:w-80">
      <h3 className="text-4xl text-center text-blue-400">Добро пожаловать!</h3>
      <h4 className="text-xl text-center text-slate-500">
        Вы вошли в систему как: <span className="underline">{auth?.name}</span>
      </h4>
      <form onSubmit={handleSignout} className="flex flex-col">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-x-2 w-fit self-center mt-3 px-3 py-1 text-base 
     bg-blue-200 border-2 border-blue-200 hover:bg-blue-100 
      disabled:text-transparent disabled:bg-blue-100 disabled:border-blue-100 disabled:text-slate-300 rounded"
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="text-slate-600"
          />
          Выйти
        </button>
      </form>
    </section>
  );
}
