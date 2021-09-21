import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import EduText from 'common/EduText';
import { formatDate } from '../../utility';
import { Colors } from '../../styles';
import FooterRegion from '../Post/FooterRegion';

const imageWidth = 55;
const imageOffset = -50;

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 50,
    width: imageWidth,
    height: imageWidth,
    borderWidth: 0.1,
    borderColor: 'black',
  },
  imageContainer: {
    position: 'absolute',
    top: -5,
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
  text: {
    fontWeight: 'normal',
    fontSize: 15,
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
  date: {
    marginLeft: 'auto',
    fontSize: 9,
  },
  footerContainer: {
    marginLeft: 'auto',
    top: -6,
    zIndex: -1,
  },
  // footer: {
  //   marginLeft: 'auto',
  // },
});

function Comment({
  profileName,
  text,
  commentDate,
  voteCount,
  profileImageURI,
}) {
  return (
    <View style={{ width: '100%', minWidth: '100%' }}>
      <View style={styles.outerContainer}>
        <View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: profileImageURI,
              }}
            />
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.profileInfoContainer}>
              <EduText style={styles.profileName}>{profileName}</EduText>
            </View>
            <View style={styles.postTitle}>
              <EduText style={styles.text}>{text}</EduText>
            </View>
          </View>
        </View>
        <EduText style={styles.date}>{formatDate(commentDate)}</EduText>
      </View>
      <View style={styles.footerContainer}>
        <FooterRegion
          rating={{
            id: 0,
            entityId: 0,
            upvotes: 0,
            downvotes: 0,
            currentUserStatus: 'sad',
          }}
          style={styles.footer}
        />
      </View>
    </View>
  );
}

export default Comment;

Comment.propTypes = {
  profileName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  commentDate: PropTypes.instanceOf(Date).isRequired,
  voteCount: PropTypes.number.isRequired,
  profileImageURI: PropTypes.string,
};

Comment.defaultProps = {
  profileImageURI:
    'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg',
};
