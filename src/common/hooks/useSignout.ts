import { useLocation, useNavigate } from 'react-router-dom';

import environment from '../environment/environment';
import appRoutes from '../routes/app-routes';
import useAuth from './useAuth';

const useSignout = () => {
  const { localStorageKey } = environment;

  const navigate = useNavigate();
  const location = useLocation();

  const { auth, setAuth } = useAuth();
  if (!auth) return null;
  if (!setAuth) return null;

  const signout = () => {
    localStorage.removeItem(localStorageKey);
    setAuth(null);
    navigate(appRoutes.Signin, { state: { from: location }, replace: true });
  };

  return signout;
};

export default useSignout;
