import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet } from 'react-native';
import { Colors, Constants } from 'styles';
import { useLocalization } from 'localization';
import { Icon } from './Icon';
import { IconNames } from './Icon/Icon';
import pressableAndroidRipple from './pressableAndroidRipple';

const GoBackButton = ({ onPress }) => {
  const { isRTL } = useLocalization();
  return (
    <Pressable
      style={styles.backIconContainer}
      onPress={onPress}
      android_ripple={pressableAndroidRipple}
    >
      <Icon
        name={isRTL ? IconNames.arrowRight : IconNames.arrowLeft}
        size={40}
        color={Colors.black}
      />
    </Pressable>
  );
};

GoBackButton.propTypes = { onPress: PropTypes.func.isRequired };
GoBackButton.defaultProps = {};

export default GoBackButton;

const borderWidth = 1;
const styles = StyleSheet.create({
  backIconContainer: {
    position: 'absolute',
    top: -borderWidth,
    left: '6.5%',

    paddingTop: 1 * Constants.fromScreenStartPadding + 7,
    padding: 5,

    borderWidth,
    borderColor: Colors.black,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
});
