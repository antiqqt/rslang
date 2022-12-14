import axios from 'axios';

import environment from '../environment/environment';

export default axios.create({
  baseURL: environment.baseUrl,
});

export const axiosSecure = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
