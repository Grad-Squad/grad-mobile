import React from 'react';
import AppLoading from 'expo-app-loading';

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
      <RootNavigator />
    </LocalizationProvider>
  );
}
