import React from 'react';
import Navigator from 'navigation/Navigator';
import ScreenNames from 'navigation/ScreenNames';
import ChangeInterests from './SubScreens/ChangeInterests';
import Options from './Options';

const screens = [
  {
    name: ScreenNames.Options.MAIN,
    component: Options,
  },
  {
    name: ScreenNames.Options.CHANGE_INTERESTS,
    component: ChangeInterests,
  },
];

const OptionsNavigator = () => <Navigator screens={screens} />;

export default OptionsNavigator;
