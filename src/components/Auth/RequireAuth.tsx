import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuth from '../../common/hooks/useAuth';
import AppRoutes from '../../common/routes/AppRoutest';

export default function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    <>
      {auth ? (
        <Outlet />
      ) : (
        <Navigate to={AppRoutes.signin} state={{ from: location }} replace />
      )}
    </>
  );
}
