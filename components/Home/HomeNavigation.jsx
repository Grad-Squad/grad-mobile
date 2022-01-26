import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'common/Icon';
import { Colors, Constants } from 'styles';
import { useLocalization } from 'localization';
import EmptyComponent from 'common/EmptyComponent';
import ScreenNames from 'navigation/ScreenNames';
import { IconNames } from 'common/Icon/Icon';
import Home from './Home';
import Search from './Search';
import Options from './Options';
import Bookmarks from './Bookmarks';
import OptionsNavigator from './Options/OptionsNavigator';

const Tab = createMaterialBottomTabNavigator();

const HomeNavigation = () => {
  const { t } = useLocalization();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={Colors.accent}
      barStyle={{
        backgroundColor: Colors.foreground,
        borderColor: Colors.border,
        borderRadius: Constants.borderRadius,
        borderTopWidth: 0.2,
      }}
      backBehavior="history"
      shifting
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: t('NavBar/Home'),
          tabBarIcon: ({ color }) => (
            <Icon name={IconNames.home} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: t('NavBar/Search'),
          tabBarIcon: ({ color }) => (
            <Icon name={IconNames.search} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={EmptyComponent}
        options={{
          tabBarLabel: t('NavBar/Create'),
          tabBarIcon: ({ color }) => (
            <Icon name={IconNames.addCircle} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(ScreenNames.CREATE_POST);
          },
        })}
      />
      <Tab.Screen
        name="bookmarks"
        component={Bookmarks}
        options={{
          tabBarLabel: t('NavBar/Bookmarks'),
          tabBarIcon: ({ color }) => (
            <Icon name={IconNames.bookmark} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Options"
        component={OptionsNavigator}
        options={{
          tabBarLabel: t('NavBar/Options'),
          tabBarIcon: ({ color }) => (
            <Icon name={IconNames.menu} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
