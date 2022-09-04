import { useContext } from 'react';

import SafeRequestContext from '../context/SafeRequestProvider';

const useSafeRequest = () => useContext(SafeRequestContext);

export default useSafeRequest;
