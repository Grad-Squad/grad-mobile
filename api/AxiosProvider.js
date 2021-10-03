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
import { API_URL } from '@env';

import Axios from 'axios';
import { useErrorSnackbar } from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import { LocalizationContext } from 'localization';
import unauthorizedRedirectBlacklist from './unauthorizedRedirectBlacklist';

const UNAUTHORIZED_STATUS_CODE = 401;

const AxiosContext = createContext();

const AxiosProvider = ({ children }) => {
  const { t } = useContext(LocalizationContext);

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

  const { showErrorSnackbar } = useErrorSnackbar();
  console.log("outside: ",apiToken)
  const axios = useMemo(() => {
    const newAxios = Axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    newAxios.interceptors.request.use((config) => {
      console.log("inside",apiToken)
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
        if (response) {
          if (
            response.status === UNAUTHORIZED_STATUS_CODE &&
            unauthorizedRedirectBlacklist.indexOf(response.config.url) === -1 &&
            unauthorizedRedirect
          ) {
            unauthorizedRedirect();
          }
        } else if (error.request) {
          showErrorSnackbar(t('Snackbar/Could not connect to the server'));
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
