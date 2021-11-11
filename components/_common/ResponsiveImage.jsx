import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, ViewPropTypes } from 'react-native';

const ResponsiveImage = ({
  imageURI,
  style,
  maxWidthRatio,
  maxHeightRatio,
}) => {
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
        {
          height: Math.min(
            height / (width / (Dimensions.get('window').width * maxWidthRatio)),
            Dimensions.get('window').height * maxHeightRatio
          ),
        },
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
  maxWidthRatio: PropTypes.number,
  maxHeightRatio: PropTypes.number,
};

ResponsiveImage.defaultProps = {
  style: {},
  maxWidthRatio: 0.9,
  maxHeightRatio: 1,
};

export default ResponsiveImage;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width * 0.9,
    resizeMode: 'contain',
    marginBottom: Dimensions.get('window').height * 0.02,
  },
});
