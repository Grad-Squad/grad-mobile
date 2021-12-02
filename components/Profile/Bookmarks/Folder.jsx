import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet } from 'react-native';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { Colors, Constants } from 'styles';
import EduText from 'common/EduText';
import pressableAndroidRipple from 'common/pressableAndroidRipple';

const Folder = ({ name, onPress }) => (
  <Pressable
    style={styles.container}
    onPress={onPress}
    android_ripple={pressableAndroidRipple}
  >
    <Icon name={IconNames.Folder} size={32} />
    <EduText style={styles.text}>{name}</EduText>
  </Pressable>
);

Folder.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
Folder.defaultProps = {};

export default Folder;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Constants.commonMargin / 2,
    marginHorizontal: Constants.commonMargin,
    borderWidth: 1,
    borderColor: Colors.offBlack,
    borderRadius: Constants.borderRadius,
  },
  text: {
    marginLeft: 5,
  },
});
