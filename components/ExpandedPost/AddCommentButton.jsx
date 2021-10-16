import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import EduText from 'common/EduText';
import {Icon} from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { Colors } from '../../styles';

import { HIT_SLOP_OBJECT } from '../../constants';

const styles = StyleSheet.create({
  CommentsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems:'center',
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

function AddCommentButton({ onPressHandler }) {
  return (
      <TouchableOpacity
        style={styles.CommentsContainer}
        onPress={onPressHandler}
        hitSlop={HIT_SLOP_OBJECT}
      >
        <Icon name={IconNames.plus} size={24} color={Colors.addCommentText} />
        <EduText style={{ color: Colors.addCommentText }}>Comment</EduText>
      </TouchableOpacity>
  );
}

export default AddCommentButton;

AddCommentButton.propTypes = {
  onPressHandler: PropTypes.func.isRequired,
};
