import React from 'react';
import PropTypes from 'prop-types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator: NativeNavigator } = createNativeStackNavigator();

const Navigator = ({ screens, initialRouteName }) => (
  <NativeNavigator
    initialRouteName={initialRouteName || screens[0].name}
    screenOptions={{
      headerShown: false,
    }}
  >
    {screens.map(({ name, component, presentation, getId }) => (
      <Screen
        key={!getId && name}
        name={name}
        component={component}
        presentation={presentation}
        getId={getId}
      />
    ))}
  </NativeNavigator>
);

Navigator.propTypes = {
  screens: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    })
  ).isRequired,
  initialRouteName: PropTypes.string,
};
Navigator.defaultProps = {
  initialRouteName: '',
};

export default Navigator;
