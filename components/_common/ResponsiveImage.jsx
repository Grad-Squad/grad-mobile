import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, ViewPropTypes } from 'react-native';

const ResponsiveImage = ({ imageURI, style }) => {
  const [height, setHeight] = useState(1);
  const [width, setWidth] = useState(1);
  return (
    <Image
      onLoad={(event) => {
        setWidth(event.nativeEvent.source.width);
        setHeight(event.nativeEvent.source.height);
      }}
      style={[
        styles.image,
        { height: height / (width / (Dimensions.get('window').width * 0.9)) },
        { ...style },
      ]}
      resizeMode="contain"
      source={{
        uri: imageURI,
      }}
    />
  );
};

ResponsiveImage.propTypes = {
  imageURI: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

ResponsiveImage.defaultProps = {
  style: {},
};

export default ResponsiveImage;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width * 0.9,
    resizeMode: 'contain',
    marginBottom: Dimensions.get('window').height * 0.02,
  },
});
