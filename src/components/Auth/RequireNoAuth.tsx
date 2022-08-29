import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuth from '../../common/hooks/useAuth';
import appRoutes from '../../common/routes/app-routes';

export default function RequireNoAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    <>
      {auth ? (
        <Navigate to={appRoutes.Profile} state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
}
