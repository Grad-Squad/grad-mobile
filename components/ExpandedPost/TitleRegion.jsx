import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import ContentRegion from './ContentRegion';
import { formatDate } from '../../utility';
import { Colors, Styles } from '../../styles';

const imageWidth = 50;
const statusBarPadding = StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 50,
    width: imageWidth,
    height: imageWidth,
    borderWidth: 0.1,
    borderColor: 'black',
  },
  backIconContainer: {
    ...Styles.dropShadow,
    position: 'absolute',
    top: -1 * statusBarPadding,
    paddingTop: 2 * statusBarPadding,
    left: '5%',
    backgroundColor: Colors.accent,
    padding: 5,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    elevation: 5,
  },
  outerContainer: {
    ...Styles.dropShadow,
    justifyContent: 'space-between',
    borderColor: 'rgba(0 ,0 , 0,0.5)',
    backgroundColor: Colors.cardBody,
    paddingHorizontal: 15,
    paddingBottom: 5,

    paddingTop: statusBarPadding,
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
        <Icon name="arrow-left" size={40} color={Colors.background} />
      </View>
      <View style={{ marginLeft: imageWidth + 25, marginTop: 5 }}>
        <Text style={{ fontSize: 18 }}>{title}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.profileInfoContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri: profileImageURI,
            }}
          />
          <Text style={{ fontSize: 9 }}>{profileName}</Text>
        </View>
        <ContentRegion />
      </View>
      <Text style={{ marginLeft: 'auto', fontSize: 9 }}>
        {formatDate(postDate)}
      </Text>
      <Text style={{ marginLeft: 'auto', fontSize: 9 }}>
        upvoted {upvotePercentage}%
      </Text>
      <Text style={{ marginLeft: 'auto', fontSize: 9 }}>{courseName}</Text>
    </View>
  );
}

export default TitleRegion;

TitleRegion.propTypes = {
  profileName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  postDate: PropTypes.instanceOf(Date).isRequired,
  profileImageURI: PropTypes.string,
  upvotePercentage: PropTypes.number.isRequired,
  courseName: PropTypes.string.isRequired,
};

TitleRegion.defaultProps = {
  profileImageURI:
    'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg',
};
