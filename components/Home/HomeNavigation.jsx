import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'common/Icon';
import { Colors, Constants } from 'styles';
import { LocalizationContext } from 'localization';
import EmptyComponent from 'common/EmptyComponent';
import Home from './Home';
import Search from './Search';
import Options from './Options';
import Bookmarks from './Bookmarks';
import { ScreenNames } from 'constants';

const Tab = createMaterialBottomTabNavigator();

const HomeNavigation = () => {
  const { t } = useContext(LocalizationContext);
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
          tabBarIcon: ({ color }) => <Icon name="home-outline" color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: t('NavBar/Search'),
          tabBarIcon: ({ color }) => <Icon name="search" color={color} />,
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={EmptyComponent}
        options={{
          tabBarLabel: t('NavBar/Create'),
          tabBarIcon: ({ color }) => (
            <Icon name="add-circle-outline" color={color} />
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
          tabBarIcon: ({ color }) => <Icon name="bookmark" color={color} />,
        }}
      />
      <Tab.Screen
        name="Options"
        component={Options}
        options={{
          tabBarLabel: t('NavBar/Options'),
          tabBarIcon: ({ color }) => <Icon name="menu" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
