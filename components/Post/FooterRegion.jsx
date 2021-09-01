import React from 'react';
import { View, StyleSheet } from 'react-native';

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

function FooterRegion({ voteCount, commentCount, comments, save }) {
  return (
    <View style={styles.outerContainer}>
      <Votes voteCount={voteCount} />
      {comments ? <CommentButton count={commentCount} /> : <View />}
      {save ? <Bookmark /> : <View />}
      <Options />
    </View>
  );
}

export default FooterRegion;

FooterRegion.propTypes = {
  voteCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number,
  comments: PropTypes.bool,
  save: PropTypes.bool,
};

FooterRegion.defaultProps = {
  commentCount: 0,
  comments: false,
  save: false,
};
