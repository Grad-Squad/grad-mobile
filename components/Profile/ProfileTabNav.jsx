import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from 'styles';
import { useLocalization } from 'localization';
import BookmarksList from 'components/Bookmarks/BookmarksList';
import PropTypes from 'prop-types';
import ProfilePosts from './ProfilePosts';

const Tab = createMaterialTopTabNavigator();
const ProfileTabNav = ({ profileId }) => {
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
      <Tab.Screen name={t('Profile/Tabs/Bookmarks')}>
        {() => <BookmarksList profileId={profileId} inProfile />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

ProfileTabNav.propTypes = {
  profileId: PropTypes.number.isRequired,
};
ProfileTabNav.defaultProps = {};

export default ProfileTabNav;

const styles = StyleSheet.create({
  background: { backgroundColor: Colors.background },
});
