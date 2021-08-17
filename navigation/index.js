import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import ForgotPasswordNavigator from '../components/ForgotPassword/ForgotPasswordNavigator';
import RegisterNavigation from '../components/Register/RegisterNavigation';

const { Screen, Navigator } = createNativeStackNavigator();

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
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map(({ name, component, title }) => (
        <Screen
          key={name}
          name={name}
          component={component}
          options={{ title }}
        />
      ))}
    </Navigator>
  </NavigationContainer>
);
export default RootNavigator;
