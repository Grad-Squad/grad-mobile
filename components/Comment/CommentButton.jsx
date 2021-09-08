import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HIT_SLOP_OBJECT } from 'constants';
import { formatNumber } from 'utility';

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
        <Text>{formatNumber(count)}</Text>
      </TouchableOpacity>
    </View>
  );
}

CommentButton.propTypes = {
  count: PropTypes.number.isRequired,
};

export default CommentButton;
