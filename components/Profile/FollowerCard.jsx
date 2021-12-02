import React from 'react';
import PropTypes from 'prop-types';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { Constants, Fonts } from 'styles';
import { MainActionButton, TransparentButton } from 'common/Input/Button';
import { useLocalization } from 'localization';
import { navigationPropType } from 'proptypes';
import ScreenNames from 'navigation/ScreenNames';
import pressableAndroidRipple from 'common/pressableAndroidRipple';

const FollowerCard = ({ navigation, profile, onFollow, onUnfollow }) => {
  const { t } = useLocalization();
  const navToProfile = () =>
    navigation.push(ScreenNames.PROFILE, { profileId: profile.id });

  return (
    <View style={[styles.row, styles.container]}>
      <Pressable onPress={navToProfile} android_ripple={pressableAndroidRipple}>
        <Image
          style={styles.profileImage}
          source={{
            uri: profile.profilePicture,
          }}
        />
      </Pressable>
      <Pressable
        onPress={navToProfile}
        android_ripple={pressableAndroidRipple}
        style={[styles.row, styles.nameContainer]}
      >
        <View>
          <EduText numberOfLines={1} style={styles.name}>
            {profile.name}
          </EduText>
          <EduText style={styles.role}>{profile.role}</EduText>
        </View>
      </Pressable>

      {profile.isFollowed ? (
        <TransparentButton
          onPress={onUnfollow}
          text={t('Profile/Unfollow')}
          textStyle={styles.followBtnText}
        />
      ) : (
        <MainActionButton
          onPress={onFollow}
          text={t('Profile/Follow')}
          textStyle={styles.followBtnText}
        />
      )}
    </View>
  );
};

FollowerCard.propTypes = {
  profile: PropTypes.exact({
    id: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    isFollowed: PropTypes.bool.isRequired,
  }).isRequired,
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
  navigation: navigationPropType.isRequired,
};
FollowerCard.defaultProps = {};

export default FollowerCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Constants.commonMargin,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  profileImage: {
    borderRadius: 70,
    width: 70,
    height: 70,
  },
  nameContainer: {
    marginLeft: Constants.commonMargin,
    marginRight: 'auto',
  },
  role: {
    fontFamily: Fonts.light,
    fontSize: 17,
  },
  name: {
    fontSize: 20,
  },
  followBtnText: { fontSize: 16 },
});
