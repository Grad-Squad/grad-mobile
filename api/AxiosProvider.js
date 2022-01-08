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
import { useLocalization } from 'localization/LocalizationProvider';
import { useNetInfo } from '@react-native-community/netinfo';
import unauthorizedRedirectBlacklist from './unauthorizedRedirectBlacklist';
import endpoints from './endpoints/endpoints';

const UNAUTHORIZED_STATUS_CODE = 401;

const AxiosContext = createContext();

const getItemFromStorage = async (itemName) =>
  (await AsyncStorage.getItem(itemName)) || '';

const AxiosProvider = ({ children }) => {
  const { t } = useLocalization();

  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const setAccessTokenFromStorage = async () => {
    const token = await getItemFromStorage(localStorageKeys.access_token);
    setAccessToken(token);
  };

  const setRefreshTokenFromStorage = async () => {
    const token = await getItemFromStorage(localStorageKeys.refresh_token);
    setRefreshToken(token);
  };

  useEffect(() => {
    setAccessTokenFromStorage();
  }, []);

  useEffect(() => {
    setRefreshTokenFromStorage();
  }, []);

  const updateAccessToken = async (newToken) => {
    await AsyncStorage.setItem(localStorageKeys.access_token, newToken);
    setAccessToken(newToken);
  };

  const updateRefreshToken = async (newToken) => {
    await AsyncStorage.setItem(localStorageKeys.refresh_token, newToken);
    setRefreshToken(newToken);
  };

  const [unauthorizedRedirect, setUnauthorizedRedirect] = useState(undefined);

  const { showErrorSnackbar } = useErrorSnackbar();
  const netInfo = useNetInfo();
  const axios = useMemo(() => {
    console.log(
      '🚀 ~ file: AxiosProvider.js ~ line 65 ~ axios ~ API_URL',
      API_URL
    );
    const newAxios = Axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      timeout: 10000,
    });

    newAxios.interceptors.response.use(
      async (response) => response,
      async (error) => {
        const { response } = error;
        if (response) {
          if (
            response.status === UNAUTHORIZED_STATUS_CODE &&
            unauthorizedRedirectBlacklist.indexOf(response.config.url) === -1 &&
            unauthorizedRedirect
          ) {
            try {
              const refreshData = await newAxios.post(endpoints.auth.refresh, {
                refreshToken,
              });
              const newToken = refreshData?.data?.data?.payload?.token;
              if (newToken) {
                updateAccessToken(newToken);
              } else {
                // todo we should check for error x either redirect or snack
                // currently backend returns 500 when refresh expires
                showErrorSnackbar(
                  t('Snackbar/Could not connect to the server')
                );
              }
            } catch (err) {
              unauthorizedRedirect();
            }
          }
        } else if (error.request && netInfo.isConnected) {
          showErrorSnackbar(t('Snackbar/Could not connect to the server'));
        }
        return Promise.reject(error);
      }
    );

    return newAxios;
  }, [refreshToken]);

  const [axiosRequestInterceptor, setAxiosRequestInterceptor] =
    useState(undefined);

  useEffect(() => {
    if (axiosRequestInterceptor !== undefined) {
      axios.interceptors.request.eject(axiosRequestInterceptor);
    }
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (accessToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
    setAxiosRequestInterceptor(requestInterceptor);
  }, [accessToken]);

  return (
    <AxiosContext.Provider
      value={{
        axios,
        setUnauthorizedRedirect,
        updateAccessToken,
        updateRefreshToken,
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
