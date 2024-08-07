import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'common/Icon';
import { HIT_SLOP_OBJECT } from 'constants';
import { formatNumber } from 'utility';
import EduText from 'common/EduText';
import { IconNames } from 'common/Icon/Icon';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from 'navigation/ScreenNames';

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

function CommentButton({ count, postId }) {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate(ScreenNames.POST, { postID: postId });
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
  postId: PropTypes.number.isRequired,
};

export default React.memo(CommentButton);
