import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import { Icon } from 'react-native-elements';
import { HIT_SLOP_OBJECT } from 'constants';
import { formatNumber } from 'utility';


const styles = StyleSheet.create({
  CommentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
  },
});

export default function Comments({ count }) {
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
          <Icon name="comment-outline" type="material-community" />
        </View>
        <Text>{formatNumber(count)}</Text>
      </TouchableOpacity>
    </View>
  );
}

Comments.propTypes = {
  count: PropTypes.number.isRequired,
};
