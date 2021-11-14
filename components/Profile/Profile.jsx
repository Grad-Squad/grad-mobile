import React from 'react';
import { StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { navigationPropType, routeParamPropType } from 'proptypes';
import EduText from 'common/EduText';
import ProfileHeader from './ProfileHeader';

const Profile = ({ navigation, route }) => {
  const { profileId } = route.params;
  return (
    <Page>
      <ProfileHeader navigation={navigation} />
      <EduText>{profileId}</EduText>
      <EduText>{profileId}</EduText>
      <EduText>{profileId}</EduText>
      <EduText>{profileId}</EduText>
      <EduText>{profileId}</EduText>
      <EduText>{profileId}</EduText>
      <EduText>{profileId}</EduText>
      <EduText>{profileId}</EduText>
      <EduText>{profileId}</EduText>
      <EduText>{profileId}</EduText>
    </Page>
  );
};

Profile.propTypes = {
  navigation: navigationPropType.isRequired,
  route: routeParamPropType.isRequired,
};
Profile.defaultProps = {};

export default Profile;

const styles = StyleSheet.create({});
