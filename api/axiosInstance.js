import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useContext,
} from 'react';

import Axios from 'axios';
import { childrenPropType } from 'proptypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'auth';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [headers, setHeaders] = useState();

  useEffect(() => {
    (async () => {
      setHeaders(await AsyncStorage.getItem(STORAGE_KEY));
    })();
  }, []);

  const setToken = (token) =>
    setHeaders({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  return (
    <AuthContext.Provider value={{ headers, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: childrenPropType.isRequired,
};

export const instance = Axios.create({
  baseURL: 'http://ec2-54-93-186-45.eu-central-1.compute.amazonaws.com:3000',
  timeout: 1000,
});

export const AxiosContext = createContext();

export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export default function AxiosProvider({ children }) {
  const axios = useMemo(() => {
    const axiosInstance = Axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axiosInstance.interceptors.request.use((config) => {
      // Read token for anywhere, in this case directly from localStorage
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    return axiosInstance;
  }, []);

  return (
    <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>
  );
}

AxiosProvider.propTypes = {
  children: childrenPropType.isRequired,
};

export function useAxios() {
  return useContext(AxiosContext);
}
