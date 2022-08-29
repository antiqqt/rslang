import apiPaths from '../api/api-paths';
import { AuthData } from '../api/auth';
import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  if (!auth) return null;
  if (!setAuth) return null;

  const refresh = async () => {
    const res = await axios.get<AuthData>(
      `${apiPaths.Users}/${auth.userId}${apiPaths.Tokens}`,
      {
        headers: {
          Authorization: `Bearer ${auth.refreshToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    setAuth((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        token: res.data.token,
        refreshToken: res.data.refreshToken,
      };
    });

    return res.data.refreshToken;
  };

  return refresh;
};

export default useRefreshToken;
