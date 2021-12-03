import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import EduText from 'common/EduText';
import { Colors } from 'styles';
import { AssetsConstants } from 'constants';
import ScreenNames from 'navigation/ScreenNames';
import { useNavigation } from '@react-navigation/native';

const AuthorInfo = ({ profilePicture, name, profileId }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.profileInfoContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.PROFILE, { profileId })}
      >
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
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.PROFILE, { profileId })}
      >
        <EduText style={styles.authorName}>{name}</EduText>
      </TouchableOpacity>
    </View>
  );
};

AuthorInfo.propTypes = {
  profilePicture: PropTypes.string,
  name: PropTypes.string.isRequired,
  profileId: PropTypes.number.isRequired,
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
    // borderWidth: 1,
    // borderColor: Colors.black,
  },
  authorName: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
});
