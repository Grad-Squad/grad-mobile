import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'common/Icon';
import { HIT_SLOP_OBJECT } from 'constants';
import { formatNumber } from 'utility';
import EduText from 'common/EduText';
import { IconNames } from 'common/Icon/Icon';

const styles = StyleSheet.create({
  CommentsContainer: {
    flexDirection: 'row',
    maxWidth: 55,
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
  },
});

function CommentButton({ count }) {
  const onPress = () => {
    console.log('COMMENT');
  };

  return (
    <TouchableOpacity
      style={styles.CommentsContainer}
      onPress={onPress}
      hitSlop={HIT_SLOP_OBJECT}
    >
      <Icon name={IconNames.comment} size={24} />
      <EduText style={styles.text}>{formatNumber(count)}</EduText>
    </TouchableOpacity>
  );
}

CommentButton.propTypes = {
  count: PropTypes.number.isRequired,
};

export default React.memo(CommentButton);
