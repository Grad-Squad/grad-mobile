import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import { useStore } from 'globalStore/GlobalStore';
import { useAPIGetProfileById } from 'api/endpoints/profile';
import EduText from 'common/EduText';
import { AssetsConstants } from 'constants';
import { Colors, Constants } from 'styles';
import ProfileSectionSkeleton from './ProfileSectionSkeleton';

const ProfileSection = () => {
  const { t } = useLocalization();
  const [store] = useStore();

  const { data, isLoading } = useAPIGetProfileById(store.profileId);
  return (
    <View style={styles.userSection}>
      {isLoading ? (
        <ProfileSectionSkeleton profilePicStyle={styles.profilePic} />
      ) : (
        <>
          {data.profilePicture ? (
            <Image
              style={styles.profilePic}
              source={{
                uri: data.profilePicture.uri
              }}
            />
          ) : (
            <Image
              style={styles.profilePic}
              source={AssetsConstants.images.defaultProfile}
            />
          )}
          <View style={styles.profileInfoSection}>
            <EduText style={styles.profileName}>{data.name}</EduText>
            <EduText style={styles.profileRole}>
              {data.role === 'student'
                ? t('Roles/Student')
                : t('Roles/Teacher')}
            </EduText>
          </View>
        </>
      )}
    </View>
  );
};

ProfileSection.propTypes = {};
ProfileSection.defaultProps = {};

export default ProfileSection;

const styles = StyleSheet.create({
  userSection: {
    backgroundColor: Colors.foreground,
    paddingHorizontal: 10,
    paddingTop: Constants.fromScreenStartPadding + 10,
    paddingBottom: 15,

    flexDirection: 'row',
    alignItems: 'flex-end',

    borderColor: Colors.border,
    borderBottomWidth: 0.2,
  },

  profilePic: {
    width: 80,
    height: 80,

    borderRadius: 80,
  },
  profileName: {
    fontSize: 28,
  },
  profileRole: {
    fontSize: 16,
    fontFamily: 'Lato_300Light',
  },
  profileInfoSection: {
    marginLeft: 15,
  },
});
