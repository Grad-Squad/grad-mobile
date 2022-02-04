import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Animated,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { fullProfilePropType, navigationPropType } from 'proptypes';
import PropTypes from 'prop-types';
import GoBackButton from 'common/GoBackButton';
import EduText from 'common/EduText';
import { MainActionButton, SecondaryActionButton } from 'common/Input/Button';
import { Constants, Fonts } from 'styles';
import { useLocalization } from 'localization';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import ScreenNames from 'navigation/ScreenNames';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { AssetsConstants } from 'constants';
import {
  profileByIdQueryKey,
  useFollowProfile,
  useUnfollowProfile,
} from 'api/endpoints/profile';
import { useQueryClient } from 'react-query';
import {
  useAPIgetS3UploadImageLinks,
  useAPIUploadImage,
  useDeleteUri,
} from 'api/endpoints/s3';
import ProfilePictureAlert from 'common/alerts/ProfilePictureAlert';
import { useAPIUpdateProfile } from 'api/endpoints/auth';
import {
  apiFeedQueryKey,
  getApiProfileFeedQueryKey,
} from 'api/endpoints/posts';
import NoInternetConnectionText from 'common/NoInternetConnectionText';
import ProfilePictureOptions from './profilePictureOptions';
import ProfilePictureModal from './ProfilePictureModal';

const NumBox = ({ title, number, onPress }) => (
  <View style={styles.numBox}>
    <Pressable
      style={styles.numBoxCenter}
      disabled={!onPress}
      onPress={onPress || (() => {})}
      android_ripple={pressableAndroidRipple}
    >
      <EduText style={styles.numBoxTitle}>{title}</EduText>
      <EduText style={styles.numBoxNumber}>{number}</EduText>
    </Pressable>
  </View>
);

NumBox.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

NumBox.defaultProps = {
  onPress: undefined,
};

const ProfileHeader = ({ navigation, profile }) => {
  const { t } = useLocalization();
  const queryClient = useQueryClient();
  const [isFollowed, setIsFollowed] = useState(profile.isFollowed);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [profilePictureModalVisible, setProfilePictureModalVisible] =
    useState(false);
  const [previousKey, setPreviousKey] = useState();
  const [isS3LinkEnabled, setIsS3LinkEnabled] = useState(false);
  const [image, setImage] = useState();

  const profilePictureOptionHandler = () => {
    setBottomSheetVisible((prev) => !prev);
  };
  const followProfileMutation = useFollowProfile({
    onError: () => {
      setIsFollowed(false);
    },
    onSuccess: () => {
      queryClient.setQueryData(profileByIdQueryKey(profile.id), (oldData) => ({
        ...oldData,
        isFollowed: true,
        _count: {
          ...oldData._count,
          followers: oldData._count.followers + 1,
        },
      }));
    },
  });
  const unfollowProfileMutation = useUnfollowProfile({
    onError: () => {
      setIsFollowed(true);
    },
    onSuccess: () => {
      queryClient.setQueryData(profileByIdQueryKey(profile.id), (oldData) => ({
        ...oldData,
        isFollowed: false,
        _count: {
          ...oldData._count,
          followers: oldData._count.followers - 1,
        },
      }));
    },
  });
  const uploadImageMutation = useAPIUploadImage();

  const deleteUriMutation = useDeleteUri({
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries(profileByIdQueryKey(profile.id));
      queryClient.invalidateQueries(getApiProfileFeedQueryKey(profile.id));
      queryClient.invalidateQueries(apiFeedQueryKey);
      setIsS3LinkEnabled(false);
    },
  });
  const updateProfileMutation = useAPIUpdateProfile({
    onSuccess: () => {
      if (previousKey) deleteUriMutation.mutate(previousKey);
      setProfilePictureModalVisible(false);
    },
  });

  const { isLoadingUploadLink } = useAPIgetS3UploadImageLinks(1, {
    enabled: isS3LinkEnabled,
    onSuccess: (data) => {
      const payload = {
        payload: {
          ...data[0].fields,
          'content-type': 'image/jpeg',
          file: {
            uri: image.uri,
            name: image.fileName,
            type: 'image/jpeg',
          },
        },
      };
      uploadImageMutation.mutate(payload, {
        onSuccess: () => {
          const IMAGEOBJ = { key: data[0].fields.key, type: 'image' };
          const dataToSend = {
            role: profile?.role,
            profilePicture: null,
            biography: profile?.biography,
          };
          dataToSend.profilePicture = { ...IMAGEOBJ };
          setPreviousKey(profile?.profilePicture?.key);
          updateProfileMutation.mutate({
            profileInfo: dataToSend,
            profileId: profile.id,
          });
        },
        onError: () => {},
      });
    },
    onError: () => {},
    onSettled: () => {},
  });

  const followMutationLoading =
    followProfileMutation.isLoading || unfollowProfileMutation.isLoading;

  const onEditProfilePicture = () => {
    if (image) {
      setIsS3LinkEnabled(true);
    }
  };
  const onRemoveProfilePicture = () => {
    setPreviousKey(profile?.profilePicture?.key);
    const dataToSend = {
      role: profile?.role,
      profilePicture: null,
      biography: profile?.biography,
    };
    setPreviousKey(profile?.profilePicture?.key);
    ProfilePictureAlert(
      t,
      () =>
        updateProfileMutation.mutate({
          profileInfo: dataToSend,
          profileId: profile.id,
        }),
      () => setBottomSheetVisible(false)
    );
  };

  const { uri: profilePictureUri = 'error' } =
    profile?.profilePicture || 'error';

  const followButton = isFollowed ? (
    <SecondaryActionButton
      onPress={() => {
        setIsFollowed(false);
        unfollowProfileMutation.mutate(profile?.id);
      }}
      text={t('Profile/Unfollow')}
      style={styles.followBtn}
      disabled={followMutationLoading}
    />
  ) : (
    <MainActionButton
      onPress={() => {
        setIsFollowed(true);
        followProfileMutation.mutate(profile?.id);
      }}
      text={t('Profile/Follow')}
      style={styles.followBtn}
      disabled={followMutationLoading}
    />
  );

  const rightHeader = (
    <View style={styles.rightHeader}>
      <View style={styles.centerProfile}>
        <TouchableOpacity
          disabled={!profile?.isOwner}
          style={styles.button}
          onPress={profilePictureOptionHandler}
        >
          <Image
            style={styles.profileImage}
            source={{
              uri: profilePictureUri,
            }}
            defaultSource={AssetsConstants.images.defaultProfile}
          />
          <ProfilePictureModal
            t={t}
            visible={profilePictureModalVisible}
            setVisible={setProfilePictureModalVisible}
            prevImage={profile?.profilePicture}
            onConfirm={onEditProfilePicture}
            setImage={setImage}
          />
          <ProfilePictureOptions
            visible={bottomSheetVisible}
            setVisible={setBottomSheetVisible}
            onDelete={onRemoveProfilePicture}
            onEdit={() => setProfilePictureModalVisible(true)}
          />
        </TouchableOpacity>
        <EduText style={styles.role}>
          {profile.role[0].toLocaleUpperCase() + profile.role.slice(1)}
        </EduText>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.NumBoxesRow}>
          <NumBox
            title={t('Profile/Header/Followers')}
            number={profile?._count?.followers}
            onPress={() =>
              navigation.navigate(ScreenNames.FOLLOWERS, {
                profileId: profile.id,
              })
            }
          />
          <NumBox
            title={t('Profile/Header/Posts')}
            number={profile?._count?.posts}
          />
        </View>
        {!profile.isOwner && (
          <View style={[styles.row, styles.followBtnContainer]}>
            {followButton}
            <Icon name={IconNames.dotsVertical} />
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Animated.View style={[styles.container]}>
      <GoBackButton
        onPress={() => {
          navigation.goBack();
        }}
        otherComponent={<EduText style={[styles.name]}>{profile.name}</EduText>}
      />
      <NoInternetConnectionText />
      {rightHeader}

      {!!profile.biography && (
        <View style={[styles.leftHeaderCenter]}>
          <EduText
            numberOfLines={4}
            style={styles.biography}
            placeholder="biography..."
          >
            {profile.biography}
          </EduText>
        </View>
      )}
    </Animated.View>
  );
};

ProfileHeader.propTypes = {
  navigation: navigationPropType.isRequired,
  profile: fullProfilePropType.isRequired,
};
ProfileHeader.defaultProps = {};

export default ProfileHeader;

const styles = StyleSheet.create({
  NumBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexGrow: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    paddingHorizontal: Constants.commonMargin,
    marginTop: 0,
  },
  leftHeaderCenter: {
    justifyContent: 'center',
  },
  rightHeader: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  numBox: {
    marginTop: Constants.commonMargin,
  },
  numBoxCenter: {
    alignItems: 'center',
  },
  numBoxTitle: {
    fontFamily: Fonts.light,
    fontSize: 18,
  },
  numBoxNumber: {
    fontSize: 20,
  },
  biography: {
    marginTop: Constants.commonMargin / 2,
  },
  followBtnContainer: {
    marginTop: Constants.commonMargin,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
  },
  role: {
    fontFamily: Fonts.light,
    fontSize: 18,
  },
  name: {
    fontSize: 24,
  },

  profileImage: {
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  centerProfile: {
    alignItems: 'center',
  },
  followBtn: {
    flex: 1,
    marginRight: 7,
  },
  statsContainer: {
    flexGrow: 3,
  },
});
