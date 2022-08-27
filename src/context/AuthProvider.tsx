import { createContext, ReactNode, useState } from 'react';

import { AuthData } from '../api/auth';

const AuthContext = createContext<AuthCtx>({});

interface AuthCtx {
  auth?: Partial<AuthData>;
  setAuth?: (val: AuthData) => void;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
