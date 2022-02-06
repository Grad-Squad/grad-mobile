import React from 'react';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import * as Sentry from 'sentry-expo';

import GlobalStore from 'globalStore/GlobalStore';
import { Colors } from 'styles';
import ErrorSnackbarProvider from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import ReactQueryClient from 'components/ReactQueryClient/ReactQueryClient';
import { Provider as ReduxProvider } from 'react-redux';
import { LogBox, Platform, UIManager } from 'react-native';
import { LocalizationProvider } from './localization';
import initStyles from './styles/init';
import RootNavigator from './navigation/RootNavigator';
import store from './globalStore/store';

LogBox.ignoreLogs(['Setting a timer']);

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

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App() {
  const ready = initStyles();

  if (!ready) {
    return <AppLoading />;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableInExpoDevelopment: true,
    enableNative: false,
    debug: true, // TODO set to false in production
  });

  return (
    <LocalizationProvider>
      <GlobalStore>
        <ReduxProvider store={store}>
          <ErrorSnackbarProvider>
            <ReactQueryClient>
              <PaperProvider theme={theme}>
                <SafeAreaProvider>
                  <StatusBar
                    // eslint-disable-next-line react/style-prop-object
                    style="dark"
                  />
                  <RootNavigator />
                </SafeAreaProvider>
              </PaperProvider>
            </ReactQueryClient>
          </ErrorSnackbarProvider>
        </ReduxProvider>
      </GlobalStore>
    </LocalizationProvider>
  );
}

export default App;
