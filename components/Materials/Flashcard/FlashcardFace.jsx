import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Colors, Constants } from 'styles';
import EduText from 'common/EduText';
import ResponsiveImage from 'common/ResponsiveImage';

const maxWidthRatio = 0.8;
const maxHeightRatio = 0.7;

const FlashcardFace = ({ text, imageURI }) => {
  const [unavailableHeight, setUnavailableHeight] = useState(0);

  return (
    <View style={styles.wrapper}>
      {imageURI && (
        <ResponsiveImage
          imageURI={imageURI}
          maxWidthRatio={maxWidthRatio}
          maxHeightRatio={
            maxHeightRatio -
            (unavailableHeight + 2 * Constants.commonMargin) /
              Dimensions.get('window').height
          }
        />
      )}
      {text && (
        <EduText
          style={styles.text}
          onLayout={(event) => {
            setUnavailableHeight(event.nativeEvent.layout.height);
          }}
        >
          {text}
        </EduText>
      )}
    </View>
  );
};

FlashcardFace.propTypes = {
  text: PropTypes.string.isRequired,
  imageURI: PropTypes.string.isRequired,
};
FlashcardFace.defaultProps = {};

export default FlashcardFace;

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: Dimensions.get('window').width * maxWidthRatio,
    maxHeight: Dimensions.get('window').height * maxHeightRatio,
    minWidth: Dimensions.get('window').width * maxWidthRatio,
    minHeight: Dimensions.get('window').height * maxHeightRatio,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardBody,
    alignSelf: 'center',
    borderRadius: Constants.borderRadius,
    padding: Constants.commonMargin,
  },
  text: {
    fontSize: 16,
  },
});
