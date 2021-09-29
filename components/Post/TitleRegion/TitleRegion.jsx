import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import EduText from 'common/EduText';
import ContentRegion from './ContentRegion';
import { formatDate } from '../../../utility';
import { Colors } from '../../../styles';

const imageWidth = 70;
const imageOffset = -25;

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 50,
    width: imageWidth,
    height: 70,

    borderWidth: 0.1,
    borderColor: 'black',
  },
  imageContainer: {
    position: 'absolute',
    top: -25,
    left: imageOffset,
    padding: 5,
    borderRadius: 50,
    borderTopWidth: 0,
    borderRightWidth: 0.1,
    borderBottomWidth: 0.1,
    borderColor: 'rgba(0 ,0 , 0,0.5)',
    backgroundColor: Colors.background,
  },
  outerContainer: {
    justifyContent: 'space-between',
    borderRadius: 7,
    borderColor: 'rgba(0 ,0 , 0,0.5)',
    backgroundColor: Colors.cardBody,
    shadowOpacity: 0.25,
    shadowColor: '#000000',
    shadowRadius: 7,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    elevation: 2,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
  titleText: {
    fontWeight: 'normal',
    fontSize: 18,
  },

  profileName: {
    fontSize: 9,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    width: '50%',
    marginRight: 'auto',
  },

  innerContainer: {
    marginLeft: imageWidth + imageOffset + 15,
    marginTop: 5,
  },

  contentContainer: {
    marginTop: 5,
  },
  date: {
    marginLeft: 'auto',
    // marginRight: 10,
    fontSize: 9,
  },
});

function TitleRegion({ profileName, title, postDate }) {
  return (
    <View style={styles.outerContainer}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://cdn.discordapp.com/attachments/810207976232976446/873648416113192980/unknown.png',
            }}
          />
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.profileInfoContainer}>
            <EduText style={styles.profileName}>{profileName}</EduText>
          </View>
          <View style={styles.postTitle}>
            <EduText style={styles.titleText}>{title}</EduText>
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ContentRegion />
      </View>
      <EduText style={styles.date}>{formatDate(postDate)}</EduText>
    </View>
  );
}

export default TitleRegion;

TitleRegion.propTypes = {
  profileName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
};
