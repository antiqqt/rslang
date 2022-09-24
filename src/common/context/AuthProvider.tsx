import { createContext, ReactNode, useEffect, useState } from 'react';

import { AuthData } from '../api/auth';
import environment from '../environment/environment';

interface AuthCtx {
  auth: AuthData | null;
  setAuth?: React.Dispatch<React.SetStateAction<AuthData | null>>;
}

const AuthContext = createContext<AuthCtx>({ auth: null });

const { localStorageKey } = environment;
const savedData = localStorage.getItem(localStorageKey);
const parsedSavedData = savedData ? JSON.parse(savedData) : null;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthData | null>(parsedSavedData);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
