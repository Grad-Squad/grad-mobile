import React from 'react';
import RequiredInfo from './RequiredInfo';
import OptionalInfo from './OptionalInfo';
import Navigator from '../../navigation/Navigator';
import RollSelection from './RollSelection/RollSelection';


const screens = [
  {
    name: 'register/requiredInfo',
    component: RequiredInfo,
  },
  {
    name: 'register/optionalInfo',
    component: OptionalInfo,
  },
  {
    name: 'register/rollSelection',
    component: RollSelection,
  },
];

const RegisterNavigation = () => <Navigator screens={screens} />;

export default RegisterNavigation;
