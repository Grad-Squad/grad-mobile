import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../components/Home/Home';

const { Screen, Navigator } = createNativeStackNavigator();

const screens = [
  {
    name: 'home',
    component: Home,
  },
];

const RootNavigator = () => (
  <NavigationContainer>
    <Navigator initialRouteName="home">
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
