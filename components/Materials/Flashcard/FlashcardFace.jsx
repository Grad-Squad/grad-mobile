import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Colors, Constants } from 'styles';
import EduText from 'common/EduText';
import ResponsiveImage from 'common/ResponsiveImage';

const maxWidthRatio = 0.8;

const FlashcardFace = ({ text, imageURI, outerUnavailableHeight }) => {
  const [unavailableHeight, setUnavailableHeight] = useState(0);
  const maxHeightRatio =
    1 - outerUnavailableHeight / Dimensions.get('window').height;

  return (
    <View
      style={[
        styles.wrapper,
        {
          maxWidth: Dimensions.get('window').width * maxWidthRatio,
          maxHeight: Dimensions.get('window').height * maxHeightRatio,
          minWidth: Dimensions.get('window').width * maxWidthRatio,
          minHeight: Dimensions.get('window').height * maxHeightRatio,
        },
      ]}
    >
      {!!imageURI && (
        <ResponsiveImage
          imageURI={imageURI}
          maxWidthRatio={maxWidthRatio}
          canMaximize={false}
          maxHeightRatio={
            maxHeightRatio -
            (unavailableHeight + 2 * Constants.commonMargin) /
              Dimensions.get('window').height
          }
        />
      )}
      {!!text && (
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

const textOrImageRequired = (props, propName, componentName) => {
  if (!props.text && !props.imageURI) {
    return new Error(
      `One of 'text' or 'imageURI' is required by '${componentName}' component.`
    );
  }
  return null;
};

FlashcardFace.propTypes = {
  text: textOrImageRequired,
  imageURI: PropTypes.string,
  outerUnavailableHeight: PropTypes.number.isRequired,
};
FlashcardFace.defaultProps = {
  text: '',
  imageURI: null,
};

export default FlashcardFace;

const styles = StyleSheet.create({
  wrapper: {
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
