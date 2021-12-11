import React, { useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { navigationPropType, routeParamPropType } from 'proptypes';
import PropTypes from 'prop-types';
import { Constants } from 'styles';
import { useAPIGetProfileById } from 'api/endpoints/profile';
import ProfileHeader from './ProfileHeader';
import ProfileTabNav from './ProfileTabNav';
import ProfileContext from './ProfileContext';
import ProfileHeaderLoading from './ProfileHeaderSkelaton';

const Profile = ({ navigation, route }) => {
  const { profileId } = route.params;
  const offset = useRef(new Animated.Value(0)).current;
  const { data: profile, isLoading } = useAPIGetProfileById(profileId);
  return (
    <Page style={styles.profilePadding}>
      <ProfileContext.Provider
        value={{
          offset,
          profileId,
        }}
      >
        {isLoading ? (
          <ProfileHeaderLoading navigation={navigation} />
        ) : (
          <ProfileHeader navigation={navigation} profile={profile} />
        )}

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
