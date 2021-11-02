import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image } from 'react-native';
import EduText from 'common/EduText';
import { Colors } from 'styles';
import { AssetsConstants } from 'constants';

const AuthorInfo = ({ profilePicture, name }) => (
  <View style={styles.profileInfoContainer}>
    <Image
      style={styles.profileImage}
      source={
        profilePicture
          ? {
              uri: profilePicture,
            }
          : AssetsConstants.images.defaultProfile
      }
    />
    <EduText style={styles.authorName}>{name}</EduText>
  </View>
);

AuthorInfo.propTypes = {
  profilePicture: PropTypes.string,
  name: PropTypes.string.isRequired,
};
AuthorInfo.defaultProps = { profilePicture: undefined };

export default React.memo(AuthorInfo);

const styles = StyleSheet.create({
  profileInfoContainer: {
    alignItems: 'center',
    marginTop: 'auto',

    flexBasis: '20%',

    marginRight: 5,
  },
  profileImage: {
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 0.1,
    borderColor: Colors.black,
  },
  authorName: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
});
