import React from 'react';
import { StyleSheet, View } from 'react-native';
import { navigationPropType } from 'proptypes';
import GoBackButton from 'common/GoBackButton';

const ProfileHeader = ({ navigation }) => (
  <View>
    <GoBackButton
      onPress={() => {
        navigation.goBack();
      }}
    />
  </View>
);

ProfileHeader.propTypes = {
  navigation: navigationPropType.isRequired,
};
ProfileHeader.defaultProps = {};

export default ProfileHeader;

const styles = StyleSheet.create({});
