import React, { useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { navigationPropType, routeParamPropType } from 'proptypes';
import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import ProfileTabNav from './ProfileTabNav';
import ProfileContext from './ProfileContext';

const Profile = ({ navigation, route }) => {
  const { profileId } = route.params;
  const offset = useRef(new Animated.Value(0)).current;

  const profile = {
    id: 2,
    createdAt: '2021-09-26T17:49:56.650Z',
    updatedAt: '2021-11-14T14:50:32.584Z',
    name: 'Sameh Initial',
    role: 'student',
    profilePicture: '',
    // biography:
    // 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    // biography: 'Lorem ipsum dolor sit ',
    biography: '',
    numPosts: 100,
    numFollowers: 150,
    isFollowed: true,
  };

  return (
    <Page>
      <ProfileContext.Provider
        value={{
          offset,
        }}
      >
        <ProfileHeader navigation={navigation} profile={profile} />
        <ProfileTabNav />
      </ProfileContext.Provider>
    </Page>
  );
};

Profile.propTypes = {
  navigation: navigationPropType.isRequired,
  route: routeParamPropType(
    PropTypes.exact({
      profileId: PropTypes.number.isRequired,
    })
  ).isRequired,
};
Profile.defaultProps = {};

export default Profile;

const styles = StyleSheet.create({});
