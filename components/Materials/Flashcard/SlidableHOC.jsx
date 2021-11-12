import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import { childrenPropType } from 'proptypes';
import { Colors } from 'styles';

const SlidableHOC = ({ canSlide, onBad, onGood, children, onFlip }) => {
  const [translate, setTranslate] = useState(0);
  const [panStartTime, setPanStartTime] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderStart: () => {
      setPanStartTime(new Date());
    },
    onPanResponderMove: (_, { dx, dy }) => {
      if (Math.abs(dx) > Math.abs(dy)) {
        setTranslate(translate + dx);
      }
    },
    onPanResponderRelease: () => {
      setTranslate(0);
      if (canSlide && translate > Dimensions.get('window').width * 0.3) {
        onGood();
      } else if (
        canSlide &&
        -1 * translate > Dimensions.get('window').width * 0.3
      ) {
        onBad();
      } else if (Math.abs(translate) === 0 || new Date() - panStartTime < 100) {
        onFlip();
      }
    },
  });

  const translationRatio = translate / Dimensions.get('window').width;
  const AbsTranslationRatio = Math.abs(translationRatio);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Animated.View {...panResponder.panHandlers}>
      <View
        style={[
          styles.wrapper,
          {
            transform: [
              { translateX: canSlide ? translate : 0 },
              { rotateZ: canSlide ? `${16 * translationRatio}deg` : '0deg' },
            ],
          },
        ]}
      >
        {children}
      </View>

      {canSlide && translate < 0 && (
        <View
          style={[styles.overlayLeft, { opacity: AbsTranslationRatio * 0.7 }]}
        />
      )}

      {canSlide && translate > 0 && (
        <View style={[styles.overlayRight, { opacity: AbsTranslationRatio }]} />
      )}
    </Animated.View>
  );
};

SlidableHOC.propTypes = {
  onGood: PropTypes.func.isRequired,
  onBad: PropTypes.func.isRequired,
  canSlide: PropTypes.bool.isRequired,
  children: childrenPropType.isRequired,
  onFlip: PropTypes.func.isRequired,
};
SlidableHOC.defaultProps = {};

export default SlidableHOC;

const overlayRadius = 135;
const overlayWidthOffset1 = Dimensions.get('window').width * 0.88;
const overlayWidthOffset2 = -1 * Dimensions.get('window').width * 0.5;
const overlay = {
  ...StyleSheet.absoluteFillObject,
  top: Dimensions.get('window').height * 0.15,
  height: '70%',
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayLeft: {
    ...overlay,
    right: overlayWidthOffset1,
    left: overlayWidthOffset2,
    backgroundColor: Colors.materialWrong,
    borderTopRightRadius: overlayRadius,
    borderBottomRightRadius: overlayRadius,
  },
  overlayRight: {
    ...overlay,
    left: overlayWidthOffset1,
    right: overlayWidthOffset2,
    backgroundColor: Colors.materialGoodTransparent,
    borderTopLeftRadius: overlayRadius,
    borderBottomLeftRadius: overlayRadius,
  },
});
