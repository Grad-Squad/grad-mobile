import React from 'react';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import GlobalStore from 'globalStore/GlobalStore';
import { Colors } from 'styles';
import AxiosProvider from 'api/AxiosProvider';
import ErrorSnackbarProvider from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import ReactQueryClient from 'components/ReactQueryClient/ReactQueryClient';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { LocalizationProvider } from './localization';
import initStyles from './styles/init';
import RootNavigator from './navigation/RootNavigator';
import { reducers } from './globalStore/store';
import Reactotron, { enhancer } from './ReactotronConfig';

let store;
// eslint-disable-next-line no-undef
if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    console.log('Reactotron Configured');
  });
  store = configureStore({ reducer: reducers, enhancers: enhancer });
} else {
  store = configureStore({ reducer: reducers });
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.accent,
    error: Colors.error,
    disabled: Colors.separator,
    placeholder: Colors.offBlack,
  },
};

export default function App() {
  const ready = initStyles();

  if (!ready) {
    return <AppLoading />;
  }

  return (
    <LocalizationProvider>
      <GlobalStore>
        <ReduxProvider store={store}>
          <ErrorSnackbarProvider>
            <AxiosProvider>
              <ReactQueryClient>
                <PaperProvider theme={theme}>
                  <SafeAreaProvider>
                    <StatusBar />
                    <RootNavigator />
                  </SafeAreaProvider>
                </PaperProvider>
              </ReactQueryClient>
            </AxiosProvider>
          </ErrorSnackbarProvider>
        </ReduxProvider>
      </GlobalStore>
    </LocalizationProvider>
  );
}
