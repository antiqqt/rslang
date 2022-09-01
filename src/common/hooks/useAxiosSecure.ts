import { useEffect } from 'react';

import { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import { axiosSecure } from '../api/axios';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

interface ExtendedRequestConfig extends AxiosRequestConfig {
  sent: boolean;
}

const useAxiosSecure = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const reqIntercept = axiosSecure.interceptors.request.use(
      (config) => {
        const reqHeaders = config.headers as AxiosRequestHeaders;

        if (!reqHeaders.Authorization) {
          reqHeaders.Authorization = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (err: AxiosError) => Promise.reject(err)
    );

    const resIntercept = axiosSecure.interceptors.response.use(
      (response) => response,
      async (err: AxiosError) => {
        const prevRequest = err.config as ExtendedRequestConfig;

        if (err.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;

          if (!refresh) return Promise.reject(err);
          const newToken = await refresh();

          const prevReqHeaders = prevRequest.headers as AxiosRequestHeaders;
          prevReqHeaders.Authorization = `Bearer ${newToken}`;

          return axiosSecure(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(resIntercept);
      axiosSecure.interceptors.request.eject(reqIntercept);
    };
  }, [auth, refresh]);

  return axiosSecure;
};

export default useAxiosSecure;
