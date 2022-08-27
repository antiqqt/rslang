import { useEffect, useRef, useState } from 'react';

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

export default function Register() {
  const userRef = useRef<HTMLInputElement>(null);

  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');

  const [success, setSuccess] = useState(false);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [match, setMatch] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === match);
  }, [pwd, match]);

  useEffect(() => {
    setErrorMsg('');
  }, [user, pwd, match]);

  return (
    <section className="flex flex-col gap-y-6 w-full h-fit mx-auto py-4 px-2 text-base text-slate-700 font-medium rounded sm:mt-16">
      {errorMsg && <p>{errorMsg}</p>}
      <h3 className="text-3xl">Регистрация</h3>
      <form className="flex flex-col gap-y-2">
        <label htmlFor="username" className="text-lg flex flex-col gap-y-2">
          Логин:
          <input
            className={`rounded bg-blue-200 px-1 ml-2 mb-2 border-2 outline-none focus:outline-slate-600 ${
              validName ? 'border-emerald-400' : 'border-red-400'
            } ${user.length === 0 && 'border-slate-400'}`}
            type="text"
            ref={userRef}
            autoComplete="off"
            required
            onChange={(e) => setUser(e.target.value)}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
        </label>
        {userFocus && !validName && (
          <p className="bg-slate-300 p-2 rounded">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            От 4 до 24 букв. <br />
            Должен начинаться с буквы. <br />
            Буквы, числа, прочерки, тире - разрешены.
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
            Пароли не соответствуют друг другу.
          </p>
        )}
      </form>
      <button
        type="submit"
        className="inline-flex items-center justify-center w-fit self-center px-3 py-1 text-base 
       bg-blue-200 border-2 border-blue-200 hover:bg-blue-100 
        disabled:text-transparent disabled:hover:bg-blue-100 rounded"
      >
        Зарегистрироваться
      </button>
    </section>
  );
}
