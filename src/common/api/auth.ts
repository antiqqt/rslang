import environment from '../environments/environment';
import apiPaths from './api-paths';

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegistrationResponse {
  name: string;
  email: string;
  id: string;
}

export interface AuthData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

const createUser = async (data: UserData) => {
  const res = await fetch(`${environment.baseUrl}${apiPaths.Users}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (res.status === 422) throw new Error('Неправильный пароль или e-mail');
  if (res.status === 417) throw new Error('Данный email уже был использован');
  if (!res.ok) throw new Error('Ошибка сервера');

  return (await res.json()) as RegistrationResponse;
};

const loginUser = async (data: LoginData) => {
  const res = await fetch(`${environment.baseUrl}${apiPaths.Signin}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (res.status === 403) throw new Error('Неправильный пароль или e-mail');
  if (!res.ok) throw new Error('Ошибка сервера');

  return (await res.json()) as AuthData;
};

export { loginUser, createUser };
