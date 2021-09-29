import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { childrenPropType } from 'proptypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localStorageKeys from 'localStorageKeys';

import Axios from 'axios';
import unauthorizedRedirectBlacklist from './unauthorizedRedirectBlacklist';

const UNAUTHORIZED_STATUS_CODE = 401;

const AxiosContext = createContext();

const AxiosProvider = ({ children }) => {
  const [apiToken, setAPIToken] = useState('');
  useEffect(() => {
    (async () => {
      setAPIToken((await AsyncStorage.getItem(localStorageKeys.auth)) || '');
    })();
  }, []);
  const updateAPIToken = (newToken) => {
    setAPIToken(newToken);
    AsyncStorage.setItem(localStorageKeys.auth, newToken);
  };

  const [unauthorizedRedirect, setUnauthorizedRedirect] = useState(undefined);

  const axios = useMemo(() => {
    const newAxios = Axios.create({
      //!   baseURL: API_URL,
      baseURL: 'http://192.168.1.108:3000',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    newAxios.interceptors.request.use((config) => {
      if (apiToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${apiToken}`;
      }

      return config;
    });

    newAxios.interceptors.response.use(
      (response) => {
        const {
          data: {
            data: { payload },
          },
        } = response;
        if (payload) {
          updateAPIToken(payload.token);
        }
        return response;
      },
      (error) => {
        const { response } = error;
        if (
          response.status === UNAUTHORIZED_STATUS_CODE &&
          unauthorizedRedirectBlacklist.indexOf(response.config.url) === -1 &&
          unauthorizedRedirect
        ) {
          unauthorizedRedirect();
        }
        return Promise.reject(error);
      }
    );

    return newAxios;
  }, []);

  return (
    <AxiosContext.Provider
      value={{
        axios,
        setUnauthorizedRedirect,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};
AxiosProvider.propTypes = {
  children: childrenPropType.isRequired,
};
AxiosProvider.defaultProps = {};

export default AxiosProvider;

export const useAxios = () => useContext(AxiosContext);
