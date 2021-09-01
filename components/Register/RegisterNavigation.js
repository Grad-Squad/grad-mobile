import React from 'react';
import Navigator from 'navigation/Navigator';
import RequiredInfo from './RequiredInfo';
import OptionalInfo from './OptionalInfo';
import RollSelection from './RollSelection/RollSelection';

const screens = [
  {
    name: 'register/requiredInfo',
    component: RequiredInfo,
  },
  {
    name: 'register/rollSelection',
    component: RollSelection,
  },
  {
    name: 'register/optionalInfo',
    component: OptionalInfo,
  },
];

const RegisterNavigation = () => <Navigator screens={screens} />;

export default RegisterNavigation;
