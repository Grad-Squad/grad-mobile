import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { formatDate } from '../../utility';
import { Colors } from '../../styles';
import Votes from '../Votes/Votes';
import Options from '../Post/Options/Options';
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
    marginTop: 15,
    marginBottom: 5,
    width: '73%',
    minWidth: '73%',
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
    width: '20%',
    marginLeft: 'auto',
    zIndex: -1,
  },
  footer: {
    width: '20%',
    marginLeft: 'auto',
  },
});

function Comment({ profileName, text, commentDate, voteCount }) {
  return (
    <View>
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
              <Text style={styles.profileName}>{profileName}</Text>
            </View>
            <View style={styles.postTitle}>
              <Text style={styles.text}>{text}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.date}>{formatDate(commentDate)}</Text>
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
};
