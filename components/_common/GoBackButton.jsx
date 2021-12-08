/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors, Constants } from 'styles';
import { useLocalization } from 'localization';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import { stylePropType } from 'proptypes';
import { Icon } from './Icon';
import { IconNames } from './Icon/Icon';
import pressableAndroidRipple from './pressableAndroidRipple';

const GoBackButton = ({
  onPress,
  otherComponent,
  isPlaceholder,
  placeholderAnimStyle,
}) => {
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
      {isPlaceholder && (
        <View
          style={{
            flex: 1,
          }}
        >
          <Placeholder
            Animation={(props) => (
              <Fade {...props} style={placeholderAnimStyle} />
            )}
            style={{ height: 24, width: '100%' }}
          >
            <PlaceholderLine width={60} height={24} />
          </Placeholder>
        </View>
      )}
      {otherComponent && otherComponent}
    </View>
  );
};

GoBackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  otherComponent: PropTypes.element,
  isPlaceholder: PropTypes.bool,
  placeholderAnimStyle: stylePropType,
};
GoBackButton.defaultProps = {
  otherComponent: undefined,
  isPlaceholder: false,
  placeholderAnimStyle: {},
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
