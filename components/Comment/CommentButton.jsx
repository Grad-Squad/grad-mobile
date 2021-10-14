import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import {Icon} from 'common/Icon';
import { HIT_SLOP_OBJECT } from 'constants';
import { formatNumber } from 'utility';
import EduText from 'common/EduText';

const styles = StyleSheet.create({
  CommentsContainer: {
    flexDirection: 'row',
    maxWidth: 55,
    left: -5,
  },
  button: {
    flexDirection: 'row',
  },
});

function CommentButton({ count }) {
  const onPress = () => {
    console.log('COMMENT');
  };

  return (
    <View style={styles.CommentsContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        hitSlop={HIT_SLOP_OBJECT}
      >
        <View>
          <Icon name="comment-outline" size={24} />
        </View>
        <EduText>{formatNumber(count)}</EduText>
      </TouchableOpacity>
    </View>
  );
}

CommentButton.propTypes = {
  count: PropTypes.number.isRequired,
};

export default CommentButton;
