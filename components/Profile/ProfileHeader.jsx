import React, { useContext, useRef, useState } from 'react';
import { Image, StyleSheet, View, Animated, Pressable } from 'react-native';
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
import { useErrorSnackbar } from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import { useQueryClient } from 'react-query';
import ProfileContext from './ProfileContext';

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

// const HEIGHT = Dimensions.get('window').height * 0.4;
const ProfileHeader = ({ navigation, profile }) => {
  const { t } = useLocalization();
  const queryClient = useQueryClient();
  const [isFollowed, setIsFollowed] = useState(profile.isFollowed);
  const { showErrorSnackbar } = useErrorSnackbar();
  const followProfileMutation = useFollowProfile({
    onError: () => {
      setIsFollowed(false);
      showErrorSnackbar('An error has occured: cannot follow user');
    },
    onSuccess: () => {
      queryClient.setQueryData(profileByIdQueryKey(profile.id), (oldData) => ({
        ...oldData,
        isFollowed: true,
        _count: {
          ...oldData._count,
          following: oldData._count.following + 1,
        },
      }));
    },
  });
  const unfollowProfileMutation = useUnfollowProfile({
    onError: () => {
      setIsFollowed(true);

      showErrorSnackbar('An error has occured: cannot unfollow user');
    },
    onSuccess: () => {
      queryClient.setQueryData(profileByIdQueryKey(profile.id), (oldData) => ({
        ...oldData,
        isFollowed: false,
        _count: {
          ...oldData._count,
          following: oldData._count.following - 1,
        },
      }));
    },
  });

  const followMutationLoading =
    followProfileMutation.isLoading || unfollowProfileMutation.isLoading;

  const { offset } = useContext(ProfileContext);
  const { uri: profilePictureUri = 'error' } =
    profile?.profilePicture || 'error';
  // const [height, setHeight] = useState(0);
  const [height, setHeight] = useState(0);

  // const headerHeight = offset.interpolate({
  //   inputRange: [0, height + insets.top],
  //   outputRange: [height + insets.top, insets.top + 44],
  //   extrapolate: 'clamp',
  // });

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
        <Image
          style={styles.profileImage}
          source={{
            uri: profilePictureUri,
          }}
          defaultSource={AssetsConstants.images.defaultProfile}
        />
        <EduText style={styles.role}>
          {profile.role[0].toLocaleUpperCase() + profile.role.slice(1)}
        </EduText>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.NumBoxesRow}>
          <NumBox
            title={t('Profile/Header/Followers')}
            number={profile?._count?.following}
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

  const scrollYClamped = Animated.diffClamp(offset, 0, height);
  const translateY = scrollYClamped.interpolate({
    inputRange: [0, height],
    outputRange: [0, -(height / 2)],
  });

  const scaleY = scrollYClamped.interpolate({
    inputRange: [0, height],
    outputRange: [0, 1],
  });
  const scaleYNumber = useRef(1);
  scaleY.addListener(({ value }) => {
    scaleYNumber.current = value;
  });

  return (
    <Animated.View
      onLayout={(event) => {
        if (height === 0) {
          setHeight(event.nativeEvent.layout.height);
        }
      }}
      style={[
        styles.container,
        {
          transform: [
            { translateY },
            { scale: scaleYNumber.current },
            { scaleY: scaleYNumber.current },
            { scaleY: scaleYNumber.current },
          ],
        },
      ]}
    >
      <GoBackButton
        onPress={() => {
          navigation.goBack();
        }}
        otherComponent={<EduText style={[styles.name]}>{profile.name}</EduText>}
      />
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
