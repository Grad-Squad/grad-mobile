import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { Constants, Fonts } from 'styles';
import { MainActionButton, TransparentButton } from 'common/Input/Button';
import { useLocalization } from 'localization';
import { navigationPropType, uriPropType } from 'proptypes';
import ScreenNames from 'navigation/ScreenNames';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { AssetsConstants } from 'constants';
import {
  getFollowersKey,
  useFollowProfile,
  useUnfollowProfile,
} from 'api/endpoints/profile';
import { useQueryClient } from 'react-query';

const FollowerCard = ({ navigation, profile }) => {
  const { t } = useLocalization();
  const navToProfile = () =>
    navigation.push(ScreenNames.PROFILE, { profileId: profile.id });
  const { uri: profilePictureUri = 'error' } =
    profile?.profilePicture || 'error';

  const queryClient = useQueryClient();
  const [isFollowed, setIsFollowed] = useState(profile.isFollowed);
  const followProfileMutation = useFollowProfile({
    onMutate: () => {
      setIsFollowed(true);
    },
    onError: () => {
      setIsFollowed(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(getFollowersKey(profile.id), {
        refetchInactive: true, // force inactive queries to refetch
      });
    },
  });
  const unfollowProfileMutation = useUnfollowProfile({
    onMutate: () => {
      setIsFollowed(false);
    },
    onError: () => {
      setIsFollowed(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(getFollowersKey(profile.id), {
        refetchInactive: true, // force inactive queries to refetch
      });
    },
  });

  const followMutationLoading =
    unfollowProfileMutation.isLoading || followProfileMutation.isLoading;
  return (
    <View style={[styles.row, styles.container]}>
      <Pressable onPress={navToProfile} android_ripple={pressableAndroidRipple}>
        <Image
          style={styles.profileImage}
          source={
            profilePictureUri
              ? {
                  uri: profilePictureUri,
                }
              : AssetsConstants.images.defaultProfile.uri
          }
          defaultSource={AssetsConstants.images.defaultProfile}
          resizeMode="cover"
        />
      </Pressable>
      <Pressable
        onPress={navToProfile}
        android_ripple={pressableAndroidRipple}
        style={[styles.row, styles.nameContainer]}
      >
        <View>
          <EduText style={styles.name}>{profile.name}</EduText>
          <EduText style={styles.role}>
            {profile.role === 'student'
              ? t('Roles/Student')
              : t('Roles/Teacher')}
          </EduText>
        </View>
      </Pressable>

      {!profile.isOwner &&
        (isFollowed ? (
          <TransparentButton
            onPress={() => unfollowProfileMutation.mutate(profile.id)}
            disabled={followMutationLoading}
            text={t('Profile/Unfollow')}
            textStyle={styles.followBtnText}
          />
        ) : (
          <MainActionButton
            onPress={() => followProfileMutation.mutate(profile.id)}
            disabled={followMutationLoading}
            text={t('Profile/Follow')}
            textStyle={styles.followBtnText}
          />
        ))}
    </View>
  );
};

FollowerCard.propTypes = {
  profile: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    profilePicture: uriPropType,
    isFollowed: PropTypes.bool.isRequired,
    isOwner: PropTypes.bool.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    biography: PropTypes.string,
  }).isRequired,
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
    alignSelf: 'center',
  },
  nameContainer: {
    marginLeft: Constants.commonMargin,
    marginRight: 'auto',
    flex: 1,
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
