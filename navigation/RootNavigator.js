import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import ForgotPasswordNavigator from '../components/ForgotPassword/ForgotPasswordNavigator';
import RegisterNavigation from '../components/Register/RegisterNavigation';
import Navigator from './Navigator';

const screens = [
  {
    name: 'home',
    component: Home,
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