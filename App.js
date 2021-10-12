import React from 'react';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import GlobalStore from 'globalstore/GlobalStore';
import { Colors } from 'styles';
import AxiosProvider from 'api/AxiosProvider';
import ErrorSnackbarProvider from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import { LocalizationProvider } from './localization';
import initStyles from './styles/init';
import RootNavigator from './navigation/RootNavigator';

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

const queryClient = new QueryClient();

export default function App() {
  const ready = initStyles();

  if (!ready) {
    return <AppLoading />;
  }

  return (
    <LocalizationProvider>
      <ErrorSnackbarProvider>
        <AxiosProvider>
          <QueryClientProvider client={queryClient}>
            <PaperProvider theme={theme}>
              <SafeAreaProvider>
                <StatusBar />
                <GlobalStore>
                  <RootNavigator />
                </GlobalStore>
              </SafeAreaProvider>
            </PaperProvider>
          </QueryClientProvider>
        </AxiosProvider>
      </ErrorSnackbarProvider>
    </LocalizationProvider>
  );
}
