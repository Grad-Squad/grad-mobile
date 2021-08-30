import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import { Colors } from '../../styles';
import Votes from '../Votes/Votes';
import Options from './Options/Options';
import CommentButton from '../Comment/CommentButton';
import Bookmark from './Bookmark/Bookmark';

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: Colors.cardFooter,
    zIndex: -1,
    top: -10,
    borderColor: 'rgba(0 ,0 , 0,0.5)',
    shadowOpacity: 0.25,
    shadowColor: '#000000',
    shadowRadius: 7,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    elevation: 1,
  },
});

function FooterRegion({ voteCount, commentCount, hasComments, hasSave }) {
  return (
    <View style={styles.outerContainer}>
      <Votes voteCount={voteCount} />
      {hasComments && <CommentButton count={commentCount} />}
      {hasSave && <Bookmark />}
      <Options />
    </View>
  );
}

export default FooterRegion;

FooterRegion.propTypes = {
  voteCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number,
  hasComments: PropTypes.bool,
  hasSave: PropTypes.bool,
};

FooterRegion.defaultProps = {
  commentCount: 0,
  hasComments: false,
  hasSave: false,
};
