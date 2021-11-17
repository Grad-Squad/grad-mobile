import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { navigationPropType } from 'proptypes';
import PropTypes from 'prop-types';
import GoBackButton from 'common/GoBackButton';
import EduText from 'common/EduText';
import { MainActionButton, SecondaryActionButton } from 'common/Input/Button';
import { Constants, Fonts } from 'styles';
import { useLocalization } from 'localization';
import { Icon } from 'common/Icon';

const NumBox = ({ title, number }) => (
  <View style={styles.numBox}>
    <EduText style={styles.numBoxTitle}>{title}</EduText>
    <EduText style={styles.numBoxNumber}>{number}</EduText>
  </View>
);

NumBox.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

const ProfileHeader = ({ navigation, profile }) => {
  const { t } = useLocalization();
  const [isFollowed, setIsFollowed] = useState(profile.isFollowed);
  const followButton = isFollowed ? (
    <SecondaryActionButton
      onPress={() => setIsFollowed(false)}
      text={t('Profile/Unfollow')}
      style={styles.followBtn}
    />
  ) : (
    <MainActionButton
      onPress={() => setIsFollowed(true)}
      text={t('Profile/Follow')}
      style={styles.followBtn}
    />
  );
  return (
    <View>
      <GoBackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.row, styles.container]}>
        <View
          style={[
            styles.leftHeader,
            !profile.biography && styles.leftHeaderCenter,
          ]}
        >
          <View style={[styles.row, styles.nameContainer]}>
            <View>
              <EduText numberOfLines={1} style={styles.name}>
                {profile.name}
              </EduText>
              <EduText style={styles.role}>{profile.role}</EduText>
            </View>
          </View>
          <EduText
            numberOfLines={4}
            style={styles.biography}
            placeholder="biography..."
          >
            {profile.biography && profile.biography}
          </EduText>
          <View style={[styles.row, styles.followBtnContainer]}>
            {followButton}
            <Icon name="dots-vertical" />
          </View>
        </View>
        <View style={styles.rightHeader}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://cdn.discordapp.com/attachments/810207976232976446/873648416113192980/unknown.png',
            }}
          />
          <NumBox title="Followers" number={123} />
          <NumBox title="Posts" number={1123} />
        </View>
      </View>
    </View>
  );
};

ProfileHeader.propTypes = {
  navigation: navigationPropType.isRequired,
  profile: PropTypes.exact({
    id: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    biography: PropTypes.string.isRequired,
    numFollowers: PropTypes.number.isRequired,
    numPosts: PropTypes.number.isRequired,
    isFollowed: PropTypes.bool.isRequired,
  }).isRequired,
};
ProfileHeader.defaultProps = {};

export default ProfileHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    margin: Constants.commonMargin,
  },
  leftHeader: {
    flexGrow: 3,
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  leftHeaderCenter: {
    justifyContent: 'center',
  },
  rightHeader: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numBox: {
    marginTop: Constants.commonMargin,
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
    marginRight: Constants.commonMargin / 2,
  },
  followBtnContainer: {
    marginTop: Constants.commonMargin,
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: Dimensions.get('window').width * 0.18,
    marginTop: Dimensions.get('window').width * 0.05,
  },

  role: {
    fontFamily: Fonts.light,
    fontSize: 18,
  },
  name: {
    fontSize: 24,
  },

  profileImage: {
    marginTop: Constants.commonMargin,
    borderRadius: 70,
    width: 70,
    height: 70,
  },
  followBtn: {
    flex: 1,
    marginRight: 7,
  },
});
