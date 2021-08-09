import React from 'react';
import RootNavigator from './navigation';

import { LocalizationProvider } from './localization';

export default function App() {
  return (
    <LocalizationProvider>
      <RootNavigator />
    </LocalizationProvider>
  );
}
