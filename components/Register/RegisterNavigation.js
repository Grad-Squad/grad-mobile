import React from 'react';
import RequiredInfo from './RequiredInfo';
import OptionalInfo from './OptionalInfo';
import Navigator from '../../navigation/Navigator';

const screens = [
  {
    name: 'register/requiredInfo',
    component: RequiredInfo,
  },
  {
    name: 'register/optionalInfo',
    component: OptionalInfo,
  },
];

const RegisterNavigation = () => <Navigator screens={screens} />;

export default RegisterNavigation;
