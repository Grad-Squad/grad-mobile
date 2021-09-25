import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { Icon } from 'common/Icon';
import PropTypes from 'prop-types';

import EduText from 'common/EduText';
import ContentRegion from './ContentRegion';
import { formatDate } from '../../utility';
import { Colors, Styles } from '../../styles';

const imageWidth = 50;
const statusBarPadding = StatusBar.currentHeight || 0;

function TitleRegion({
  profileName,
  profileImageURI,
  title,
  postDate,
  upvotePercentage,
  courseName,
}) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.backIconContainer}>
        <Icon name="arrow-left" size={40} color={Colors.black} />
      </View>
      <View style={{ marginLeft: imageWidth + 25, marginTop: 5 }}>
        <EduText style={{ fontSize: 18 }}>{title}</EduText>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.profileInfoContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri: profileImageURI,
            }}
          />
          <EduText style={{ fontSize: 9 }}>{profileName}</EduText>
        </View>
        <ContentRegion/>
      </View>
      <EduText style={{ marginLeft: 'auto', fontSize: 9 }}>
        {formatDate(postDate)}
      </EduText>
      <EduText style={{ marginLeft: 'auto', fontSize: 9 }}>
        upvoted {upvotePercentage}%
      </EduText>
      <EduText style={{ marginLeft: 'auto', fontSize: 9 }}>
        {courseName}
      </EduText>
    </View>
  );
}

export default TitleRegion;

TitleRegion.propTypes = {
  profileName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
  profileImageURI: PropTypes.string,
  upvotePercentage: PropTypes.number.isRequired,
  courseName: PropTypes.string.isRequired,
};

TitleRegion.defaultProps = {
  profileImageURI:
    'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg',
};

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 50,
    width: imageWidth,
    height: imageWidth,
    borderWidth: 0.1,
    borderColor: 'black',
  },
  backIconContainer: {
    position: 'absolute',
    top: -1 * statusBarPadding,
    paddingTop: 3 * statusBarPadding,
    left: '5%',
    backgroundColor: Colors.cardBody,
    padding: 5,
    borderWidth:1,
    borderColor:Colors.black,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  outerContainer: {
    ...Styles.dropShadow,
    justifyContent: 'space-between',
    borderColor: 'rgba(0 ,0 , 0,0.5)',
    backgroundColor: Colors.cardBody,
    paddingHorizontal: 15,
    paddingBottom: 5,

    paddingTop: 2 * statusBarPadding,
    top: -1 * statusBarPadding,
  },
  profileInfoContainer: {
    marginRight: 15,
    alignItems: 'center',
    marginTop: 'auto',
  },
  contentContainer: {
    flexDirection: 'row',
    marginTop: 5,
    width: '80%',
    alignItems: 'center',
  },
});
