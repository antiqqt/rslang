import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuth from '../../common/hooks/useAuth';
import appRoutes from '../../common/routes/app-routes';

export default function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    <>
      {auth ? (
        <Outlet />
      ) : (
        <Navigate to={appRoutes.Signin} state={{ from: location }} replace />
      )}
    </>
  );
}
