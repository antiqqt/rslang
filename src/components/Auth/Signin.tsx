import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, Location, useLocation, useNavigate } from 'react-router-dom';

import { loginUser } from '../../api/auth';
import useAuth from '../../common/hooks/useAuth';
import AppRoutes from '../../common/routes/AppRoutest';

export default function Signin() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation() as unknown as {
    state: {
      from: Location;
    };
  };
  const from = location.state?.from?.pathname || AppRoutes.profile;

  const emailRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMsg('');
  }, [email, pwd]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password: pwd });

      if (setAuth) setAuth(res);
      setEmail('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(`${err.message}.`);
      }
    }
  };

  return (
    <section className="flex flex-col gap-y-6 w-full h-fit mx-auto py-4 px-2 text-base text-slate-700 font-medium rounded sm:mt-8 sm:w-80">
      {errorMsg && <p className="px-2 py-1 bg-red-300 rounded">{errorMsg}</p>}
      <h3 className="text-3xl text-center">Авторизация</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <label htmlFor="email" className="text-lg flex flex-col gap-y-2">
          E-mail:
          <input
            className={`rounded bg-blue-200 px-1 ml-2 mb-2 border-2 outline-none focus:outline-slate-600 
            border-slate-400`}
            type="email"
            name="email"
            ref={emailRef}
            autoComplete="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="text-lg flex flex-col gap-y-2">
          Пароль:
          <input
            className="rounded bg-blue-200 px-1 ml-2 mb-2 border-2 outline-none focus:outline-slate-600 border-slate-400"
            type="password"
            value={pwd}
            required
            onChange={(e) => setPwd(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center justify-center w-fit self-center mt-3 px-3 py-1 text-base 
     bg-blue-200 border-2 border-blue-200 hover:bg-blue-100 
      disabled:text-transparent disabled:bg-blue-100 disabled:border-blue-100 disabled:text-slate-300 rounded"
          disabled={!!(email.length === 0 || pwd.length === 0)}
        >
          Войти в систему
        </button>
      </form>
      <div className="flex flex-col">
        <p>Ещё не зарегистрированы?</p>
        <Link to={AppRoutes.register} className="underline text-blue-300">
          Зарегистрироваться
        </Link>
      </div>
    </section>
  );
}
