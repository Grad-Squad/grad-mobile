import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import EduText from 'common/EduText';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../../styles';

import { HIT_SLOP_OBJECT } from '../../constants';

const styles = StyleSheet.create({
  CommentsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 7,
    borderWidth: 2,
    borderStyle: 'dashed',
    width: '90%',
    padding: 5,
    justifyContent: 'center',
    borderColor: Colors.addCommentBorder,
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
  },
});

function AddCommentButton({ postID, onPress }) {
  return (
      <TouchableOpacity
        style={styles.CommentsContainer}
        onPress={onPress}
        hitSlop={HIT_SLOP_OBJECT}
      >
        <Icon name="plus" size={24} color={Colors.addCommentText} />
        <EduText style={{ color: Colors.addCommentText }}>Comment</EduText>
      </TouchableOpacity>
  );
}

export default AddCommentButton;
