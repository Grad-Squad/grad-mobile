import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RequiredInfo from './RequiredInfo';
import OptionalInfo from './OptionalInfo';

const { Screen, Navigator } = createNativeStackNavigator();

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

const RegisterNavigation = () => ( // todo refactor
  <Navigator
    initialRouteName={screens[0].name}
    screenOptions={{
      headerShown: false,
    }}
  >
    {screens.map(({ name, component }) => (
      <Screen key={name} name={name} component={component} />
    ))}
  </Navigator>
);

export default RegisterNavigation;
