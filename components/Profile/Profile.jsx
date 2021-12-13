import React, { useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { navigationPropType, routeParamPropType } from 'proptypes';
import PropTypes from 'prop-types';
import { Constants } from 'styles';
import ProfileHeader from './ProfileHeader';
import ProfileTabNav from './ProfileTabNav';
import ProfileContext from './ProfileContext';

const Profile = ({ navigation, route }) => {
  const { profileId } = route.params;
  const offset = useRef(new Animated.Value(0)).current;

  const profile = {
    id: 1,
    createdAt: '2021-09-26T17:49:56.650Z',
    updatedAt: '2021-11-14T14:50:32.584Z',
    name: 'Ahmed M. Sadek',
    role: 'teacher',
    profilePicture: {
      id: 1,
      key: "a09bb2c0-a721-4830-920c-4812e1228909",
      uri: "https://educate-awesome-test.s3.eu-central-1.amazonaws.com/a09bb2c0-a721-4830-920c-4812e1228909",
      type: "image"
  },
    biography: "you have any idea how fast I am ?\n",
    _count:{
      posts: 0,
      followers: 0,
    },
    isOwner: true,
    isFollowed: false,
  };

  return (
    <Page style={styles.profilePadding}>
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

const styles = StyleSheet.create({
  profilePadding: {
    paddingTop: Constants.fromScreenStartPadding,
  },
});
