import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from 'styles';
import { useLocalization } from 'localization';
import ProfilePosts from './ProfilePosts';
import Bookmarks from './Bookmarks';

const Tab = createMaterialTopTabNavigator();
const ProfileTabNav = () => {
  const { t } = useLocalization();
  return (
    <Tab.Navigator
      style={{ flex: 1 }}
      sceneContainerStyle={{ flex: 1 }}
      screenOptions={{
        tabBarStyle: { ...styles.background },
      }}
    >
      <Tab.Screen name={t('Profile/Tabs/Posts')} component={ProfilePosts} />
      <Tab.Screen name={t('Profile/Tabs/Bookmarks')} component={Bookmarks} />
    </Tab.Navigator>
  );
};

ProfileTabNav.propTypes = {};
ProfileTabNav.defaultProps = {};

export default ProfileTabNav;

const styles = StyleSheet.create({
  background: { backgroundColor: Colors.background },
});
