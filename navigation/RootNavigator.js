import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Dev from 'components/Dev/Dev';
import HomeNavigation from 'components/Home/HomeNavigation';
import Login from '../components/Login/Login';
import ForgotPasswordNavigator from '../components/ForgotPassword/ForgotPasswordNavigator';
import RegisterNavigation from '../components/Register/RegisterNavigation';
import Navigator from './Navigator';

const screens = [
  {
    name: 'dev',
    component: Dev,
  },
  {
    name: 'home',
    component: HomeNavigation,
  },
  {
    name: 'login',
    component: Login,
  },
  {
    name: 'register',
    component: RegisterNavigation,
  },
  {
    name: 'forgotPassword',
    component: ForgotPasswordNavigator,
  },
];

const RootNavigator = () => (
  <NavigationContainer>
    <Navigator screens={screens} />
  </NavigationContainer>
);
export default RootNavigator;
