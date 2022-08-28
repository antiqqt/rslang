import { createContext, ReactNode, useState } from 'react';

import { AuthData } from '../api/auth';

const AuthContext = createContext<AuthCtx>({ auth: null, setAuth: null });

interface AuthCtx {
  auth: AuthData | null;
  setAuth: ((val: AuthData | null) => void) | null;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthData | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
