import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors, Constants } from 'styles';
import { useLocalization } from 'localization';
import { Icon } from './Icon';
import { IconNames } from './Icon/Icon';
import pressableAndroidRipple from './pressableAndroidRipple';

const GoBackButton = ({ onPress, otherComponent }) => {
  const { isRTL } = useLocalization();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backIconContainer}
        onPress={onPress}
        android_ripple={pressableAndroidRipple}
      >
        <Icon
          name={isRTL ? IconNames.arrowRight : IconNames.arrowLeft}
          size={40}
          color={Colors.black}
          style={styles.backIcon}
        />
      </Pressable>
      {otherComponent && otherComponent}
    </View>
  );
};

GoBackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  otherComponent: PropTypes.element,
};
GoBackButton.defaultProps = {
  otherComponent: undefined,
};

export default GoBackButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIconContainer: {
    width: 40 + Constants.commonMargin,
    padding: Constants.commonMargin / 2,
    paddingVertical: Constants.commonMargin / 5,
    alignSelf: 'flex-start',
  },
  backIcon: {},
});
