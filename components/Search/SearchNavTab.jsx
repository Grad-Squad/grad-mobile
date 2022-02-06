import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from 'styles';
import { useLocalization } from 'localization';
import SearchAll from './SearchAll';
import SearchPosts from './SearchPosts';
import SearchPeople from './Searchpeople';

const Tab = createMaterialTopTabNavigator();

const SearchNavTab = () => {
  const { t } = useLocalization();

  return (
    <Tab.Navigator
      initialRouteName="SearchAll"
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.foreground },
        tabBarIndicatorStyle: { backgroundColor: Colors.accent },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.grey,
      }}
      backBehavior="history"
      shifting
    >
      <Tab.Screen
        name="SearchAll"
        component={SearchAll}
        options={{
          tabBarLabel: t('SearchNav/All'),
        }}
      />
      <Tab.Screen
        name="SearchPosts"
        component={SearchPosts}
        options={{
          tabBarLabel: t('SearchNav/Posts'),
        }}
      />
      <Tab.Screen
        name="SearchPeople"
        component={SearchPeople}
        options={{
          tabBarLabel: t('SearchNav/People'),
        }}
      />
    </Tab.Navigator>
  );
};

SearchNavTab.propTypes = {};
SearchNavTab.defaultProps = {};

export default SearchNavTab;
