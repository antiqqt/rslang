import { createContext, ReactNode } from 'react';

import axios from '../api/axios';
import useAxiosSecure from '../hooks/useAxiosSecure';

const SafeRequestContext = createContext(axios);

const SafeRequestProvider = ({ children }: { children: ReactNode }) => {
  const safeRequest = useAxiosSecure();

  return (
    <SafeRequestContext.Provider value={safeRequest}>
      {children}
    </SafeRequestContext.Provider>
  );
};

export default SafeRequestContext;
export { SafeRequestProvider };
