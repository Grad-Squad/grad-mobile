import React from 'react';
import Navigator from 'navigation/Navigator';
import ScreenNames from 'navigation/ScreenNames';
import ChangeInterests from './SubScreens/ChangeInterests';
import Options from './Options';
import ChangeLanguage from './SubScreens/ChangeLanguage';

const screens = [
  {
    name: ScreenNames.Options.MAIN,
    component: Options,
  },
  {
    name: ScreenNames.Options.CHANGE_INTERESTS,
    component: ChangeInterests,
  },
  {
    name: ScreenNames.Options.CHANGE_LANGUAGE,
    component: ChangeLanguage,
  },
];

const OptionsNavigator = () => <Navigator screens={screens} />;

export default OptionsNavigator;
