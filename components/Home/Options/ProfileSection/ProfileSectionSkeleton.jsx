import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';
import DarkFade from 'common/skeleton/DarkFade';
import { stylePropType } from 'proptypes';

const ProfileSectionSkeleton = ({ profilePicStyle }) => (
  <Placeholder Animation={DarkFade}>
    <View style={styles.userSectionSkeleton}>
      <PlaceholderMedia isRound style={profilePicStyle} />
      <Placeholder Animation={DarkFade}>
        <View style={styles.profileInfoSkeleton}>
          <PlaceholderLine
            height={25}
            width={50}
            noMargin
            style={styles.profileNameSkeleton}
          />
          <PlaceholderLine height={15} width={30} noMargin />
        </View>
      </Placeholder>
    </View>
  </Placeholder>
);

ProfileSectionSkeleton.propTypes = {
  profilePicStyle: stylePropType,
};
ProfileSectionSkeleton.defaultProps = { profilePicStyle: {} };

export default ProfileSectionSkeleton;

const styles = StyleSheet.create({
  userSectionSkeleton: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  profileInfoSkeleton: {
    marginLeft: 10,
  },
  profileNameSkeleton: {
    marginBottom: 10,
  },
});
