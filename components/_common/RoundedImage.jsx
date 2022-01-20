import React from 'react';
import { StyleSheet, View } from 'react-native';
import { stylePropType } from 'proptypes';
import { Styles } from 'styles';
import ResponsiveImage from './ResponsiveImage';

const RoundedImage = ({ containerStyle, style, ...props }) => (
  <View style={[styles.roundedCorner, containerStyle]}>
    <ResponsiveImage
      style={[styles.topImage, style]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </View>
);

RoundedImage.propTypes = {
  containerStyle: stylePropType,
  style: stylePropType,
};
RoundedImage.defaultProps = {
  containerStyle: {},
  style: {},
};

export default RoundedImage;

const styles = StyleSheet.create({
  roundedCorner: {
    borderRadius: 20,
    overflow: 'hidden',
    ...Styles.dropShadow,
  },
  topImage: {
    marginBottom: 0,
  },
});
