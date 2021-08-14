import React from 'react';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import RootNavigator from './navigation';
import { LocalizationProvider } from './localization';
import initStyles from './styles/init';

export default function App() {
  const ready = initStyles();

  if (!ready) {
    return <AppLoading />;
  }

  return (
    <LocalizationProvider>
      <SafeAreaProvider>
        <StatusBar />
        <RootNavigator />
      </SafeAreaProvider>
    </LocalizationProvider>
  );
}
