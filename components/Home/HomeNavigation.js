import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Constants } from 'styles';
import Feather from 'react-native-vector-icons/Feather';
import { LocalizationContext } from 'localization';
import EmptyComponent from 'common/EmptyComponent';
import Home from './Home';
import Search from './Search';
import Options from './Options';
import Bookmarks from './Bookmarks';

const Tab = createMaterialBottomTabNavigator();

const iconSize = 26;

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
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: t('NavBar/Search'),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={EmptyComponent}
        options={{
          tabBarLabel: t('NavBar/Create'),
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="add-circle-outline"
              color={color}
              size={iconSize}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('createPost');
          },
        })}
      />
      <Tab.Screen
        name="bookmarks"
        component={Bookmarks}
        options={{
          tabBarLabel: t('NavBar/Bookmarks'),
          tabBarIcon: ({ color }) => (
            <Feather name="bookmark" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Options"
        component={Options}
        options={{
          tabBarLabel: t('NavBar/Options'),
          tabBarIcon: ({ color }) => (
            <Feather name="menu" color={color} size={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
