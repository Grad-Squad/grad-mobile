import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet } from 'react-native';
import { IconNames } from 'common/Icon/Icon';
import EduText from 'common/EduText';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { Icon } from 'common/Icon';

const OptionButton = ({ label, iconName, onPress }) => (
  <Pressable
    android_ripple={pressableAndroidRipple}
    onPress={onPress}
    style={styles.optionButton}
  >
    <Icon name={iconName} size={30} />
    <EduText style={styles.optionName}>{label}</EduText>
  </Pressable>
);

OptionButton.propTypes = {
  label: PropTypes.string.isRequired,
  iconName: PropTypes.oneOf(Object.values(IconNames)),
  onPress: PropTypes.func.isRequired,
};
OptionButton.defaultProps = { iconName: IconNames.settings };

export default OptionButton;

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  optionName: {
    fontSize: 25,

    marginLeft: 5,
  },
});
