import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuth from '../../common/hooks/useAuth';
import AppRoutes from '../../common/routes/AppRoutest';

export default function RequireNoAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    <>
      {auth ? (
        <Navigate to={AppRoutes.profile} state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
}
