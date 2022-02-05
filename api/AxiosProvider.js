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
import PropTypes from 'prop-types';
import Axios from 'axios';
import { useErrorSnackbar } from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import { useLocalization } from 'localization/LocalizationProvider';
import { useNetInfo } from '@react-native-community/netinfo';
import ScreenNames from 'navigation/ScreenNames';
import { Alert } from 'react-native';
import LoadingIndicator from 'common/LoadingIndicator';
import unauthorizedRedirectBlacklist from './unauthorizedRedirectBlacklist';
import endpoints from './endpoints/endpoints';

const UNAUTHORIZED_STATUS_CODE = 401;

const AxiosContext = createContext();

const getItemFromStorage = async (itemName) =>
  (await AsyncStorage.getItem(itemName)) || '';

const AxiosProvider = ({ navigationRef, children }) => {
  const { t } = useLocalization();

  const [accessToken, setAccessToken] = useState('');
  const [hasCheckedAccessToken, SetHasCheckedAccessToken] = useState(false);
  const [refreshToken, setRefreshToken] = useState('');
  const [onAccessTokenChangeCallbacks, setOnAccessTokenChangeCallbacks] =
    useState([]);

  useEffect(() => {
    (async () => {
      const newAccessToken = await getItemFromStorage(
        localStorageKeys.access_token
      );
      const newRefreshToken = await getItemFromStorage(
        localStorageKeys.refresh_token
      );
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      SetHasCheckedAccessToken(true);
    })();
  }, []);

  const updateAccessToken = async (newToken) => {
    await AsyncStorage.setItem(localStorageKeys.access_token, newToken);
    setAccessToken(newToken);
  };

  const updateRefreshToken = async (newToken) => {
    await AsyncStorage.setItem(localStorageKeys.refresh_token, newToken);
    setRefreshToken(newToken);
  };

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
            unauthorizedRedirectBlacklist.indexOf(response.config.url) === -1
          ) {
            if (response.config.url === endpoints.auth.refresh) {
              if (navigationRef.getCurrentRoute().name !== ScreenNames.LOGIN) {
                navigationRef.reset({
                  index: 0,
                  routes: [{ name: ScreenNames.LOGIN }],
                });
                Alert.alert(t('Sorry, You have to log in again'));
              }
            } else {
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
    onAccessTokenChangeCallbacks.forEach((callback) => {
      callback();
    });
    setOnAccessTokenChangeCallbacks([]);
    setAxiosRequestInterceptor(requestInterceptor);
  }, [accessToken]);

  return (
    <AxiosContext.Provider
      value={{
        axios,
        updateAccessToken,
        updateRefreshToken,
        addOnAccessTokenChangeCallback: (callback) => {
          setOnAccessTokenChangeCallbacks((prev) => [...prev, callback]);
        },
      }}
    >
      {hasCheckedAccessToken ? (
        children
      ) : (
        <LoadingIndicator fullScreen size="large" />
      )}
    </AxiosContext.Provider>
  );
};
AxiosProvider.propTypes = {
  navigationRef: PropTypes.shape({
    getCurrentRoute: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }).isRequired,
  children: childrenPropType.isRequired,
};
AxiosProvider.defaultProps = {};

export default AxiosProvider;

export const useAxios = () => useContext(AxiosContext);
