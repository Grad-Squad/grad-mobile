import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EnterEmail from './EnterEmail';
import CheckEmail from './CheckEmail';
import SixDigit from './SixDigit';
import SixDigitFailed from './SixDigitFailed';
import NewPassword from './NewPassword';
import Done from './Done';

const { Screen, Navigator } = createNativeStackNavigator();

const screens = [
  {
    name: 'forgotPassword/enterEmail',
    component: EnterEmail,
  },
  {
    name: 'forgotPassword/checkEmail',
    component: CheckEmail,
  },
  {
    name: 'forgotPassword/sixDigit',
    component: SixDigit,
  },
  {
    name: 'forgotPassword/sixDigitFailed',
    component: SixDigitFailed,
  },
  {
    name: 'forgotPassword/newPassword',
    component: NewPassword,
  },
  {
    name: 'forgotPassword/done',
    component: Done,
  },
];

const ForgotPasswordNavigator = () => (
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

export default ForgotPasswordNavigator;
