import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { createUser } from '../../common/api/auth';
import appRoutes from '../../common/routes/app-routes';

const NAME_REGEX = /^[a-zA-Zа-яА-я0-9]{1,24}$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

export default function Register() {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState('');

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [match, setMatch] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === match);
  }, [pwd, match]);

  useEffect(() => {
    setErrorMsg('');
  }, [email, pwd, match, name]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUser({ name, email, password: pwd });
      navigate(appRoutes.Signin, { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(`${err.message}.`);
      }
    }
  };

  return (
    <section className="flex flex-col gap-y-6 w-full h-fit mx-auto py-4 px-2 text-base text-slate-700 font-medium rounded sm:mt-8 sm:w-80">
      {errorMsg && <p className="px-2 py-1 bg-red-300 rounded">{errorMsg}</p>}
      <h3 className="text-3xl text-center">Регистрация</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <label htmlFor="username" className="text-lg flex flex-col gap-y-2">
          Имя:
          <input
            className={`rounded bg-blue-200 px-1 ml-2 mb-2 border-2 outline-none focus:outline-slate-600 ${
              validName ? 'border-emerald-400' : 'border-red-400'
            } ${name.length === 0 && 'border-slate-400'}`}
            type="text"
            ref={nameRef}
            autoComplete="off"
            required
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
          />
        </label>
        {nameFocus && !validName && (
          <p className="bg-slate-300 p-2 rounded">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            Введите ваше имя. <br />
            Разрешены русские и английские буквы, а также цифры. <br />
            До 24 символов.
          </p>
        )}
        <label htmlFor="email" className="text-lg flex flex-col gap-y-2">
          E-mail:
          <input
            className={`rounded bg-blue-200 px-1 ml-2 mb-2 border-2 outline-none focus:outline-slate-600 ${
              validEmail ? 'border-emerald-400' : 'border-red-400'
            } ${email.length === 0 && 'border-slate-400'}`}
            type="email"
            autoComplete="off"
            required
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
        </label>
        {emailFocus && !validEmail && (
          <p className="bg-slate-300 p-2 rounded">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            Введите ваш E-mail.
          </p>
        )}
        <label htmlFor="password" className="text-lg flex flex-col gap-y-2">
          Пароль:
          <input
            className={`rounded bg-blue-200 px-1 ml-2 mb-2 border-2 outline-none focus:outline-slate-600 ${
              validPwd ? 'border-emerald-400' : 'border-red-400'
            } ${pwd.length === 0 && 'border-slate-400'}`}
            type="password"
            required
            onChange={(e) => setPwd(e.target.value)}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
        </label>
        {pwdFocus && !validPwd && (
          <p className="bg-slate-300 p-2 rounded">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            От 8 до 24 букв. <br />
            Должен включать английские буквы верхнего и нижнего регистров, а
            также любое число. <br />
          </p>
        )}
        <label htmlFor="match" className="text-lg flex flex-col gap-y-2">
          Повторите пароль:
          <input
            className={`rounded bg-blue-200 px-1 ml-2 mb-2 border-2 outline-none ${
              validMatch ? 'border-emerald-400' : 'border-red-400'
            } ${match.length === 0 && 'border-slate-400'}`}
            type="password"
            required
            onChange={(e) => setMatch(e.target.value)}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
        </label>
        {matchFocus && !validMatch && (
          <p className="bg-slate-300 p-2 rounded">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            Пароли должны соответствовать друг другу.
          </p>
        )}
        <button
          type="submit"
          className="inline-flex items-center justify-center w-fit self-center mt-3 px-3 py-1 text-base 
     bg-blue-200 border-2 border-blue-200 hover:bg-blue-100 
      disabled:text-transparent disabled:bg-blue-100 disabled:border-blue-100 disabled:text-slate-300 rounded"
          disabled={!!(!validEmail || !validPwd || !validMatch)}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="flex flex-col">
        <p>Есть существующий аккаунт?</p>
        <Link to={appRoutes.Signin} className="underline text-blue-300">
          Авторизоваться
        </Link>
      </div>
    </section>
  );
}
