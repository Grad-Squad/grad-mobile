import React from 'react';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';

import RootNavigator from './navigation';
import { LocalizationProvider } from './localization';
import initStyles from './styles/init';

const queryClient = new QueryClient();

export default function App() {
  const ready = initStyles();

  if (!ready) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider>
        <SafeAreaProvider>
          <StatusBar />
          <RootNavigator />
        </SafeAreaProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}
