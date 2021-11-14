/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Dimensions,
  Image,
  ViewPropTypes,
  Pressable,
  View,
} from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { Colors } from 'styles';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PinchGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const ResponsiveImage = ({
  imageURI,
  style,
  maxWidthRatio,
  maxHeightRatio,
  canMaximize,
}) => {
  const imagePinch = React.createRef();
  const imagePan = React.createRef();

  const [height, setHeight] = useState(1);
  const [width, setWidth] = useState(1);

  const [newHeight, setNewHeight] = useState(0);
  const [newWidth, setNewWidth] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);

  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const translateX = useSharedValue(0);
  console.log(
    '🚀 ~ file: ResponsiveImage.jsx ~ line 48 ~ translateX',
    translateX.value
  );
  const translateY = useSharedValue(0);
  const prevTranslateX = useSharedValue(0);
  const prevTranslateY = useSharedValue(0);

  const prevScale = useSharedValue(1);
  const prevFocalX = useSharedValue(0);
  const prevFocalY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      // scale.value = event.scale;
      // focalX.value = event.focalX;
      // focalY.value = event.focalY;
      scale.value = event.scale * prevScale.value;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => {
      prevFocalX.value = focalX.value;
      prevFocalY.value = focalY.value;
      prevScale.value = scale.value;
      if (scale.value < 1) {
        scale.value = withTiming(1);
        prevScale.value = withTiming(1);
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      }
    },
  });

  const panHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      if (scale.value > 1) {
        console.log(
          '🚀 ~ file: ResponsiveImage.jsx ~ line 86 ~ (prevTranslateX.value + event.translationX) / scale.value',
          (prevTranslateX.value + event.translationX) / scale.value
        );
        if (
          Math.abs((prevTranslateX.value + event.translationX) / scale.value) <
          0.2 * newWidth
        ) {
          translateX.value = prevTranslateX.value + event.translationX;
        }
        if (
          Math.abs((prevTranslateY.value + event.translationY) / scale.value) <
          0.2 * newHeight
        ) {
          translateY.value = prevTranslateY.value + event.translationY;
        }
        console.log(
          '🚀 ~ file: ResponsiveImage.jsx ~ line 48 ~ translateX',
          translateX.value
        );
      }
    },
    onEnd: () => {
      prevTranslateX.value = translateX.value;
      prevTranslateY.value = translateY.value;
    },
  });

  const pinchStyle = useAnimatedStyle(() => ({
    transform: [
      // { translateX: focalX.value },
      // { translateY: focalY.value },
      // { translateX: -newWidth / 2 },
      // { translateY: -newHeight / 2 },

      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },

      // { translateX: -focalX.value },
      // { translateY: -focalY.value },
      // { translateX: newWidth / 2 },
      // { translateY: newHeight / 2 },

      // { translateY: prevTranslateY.value + translateY.value },
    ],
  }));

  const focalPointStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
  }));

  return (
    <View>
      <Pressable
        onPress={() => {
          if (canMaximize) {
            setIsMaximized(true);
            const { width: maxWidth, height: maxHeight } =
              Dimensions.get('window');

            const heightIfMaxWidth = (maxWidth * height) / width;
            if (width > height || heightIfMaxWidth <= maxHeight) {
              setNewWidth(maxWidth);
              setNewHeight(heightIfMaxWidth);
            } else {
              setNewHeight(maxHeight);
              setNewWidth((width * maxHeight) / height);
            }
          }
        }}
      >
        <Image
          onLoad={(event) => {
            setWidth(event.nativeEvent.source.width);
            setHeight(event.nativeEvent.source.height);
          }}
          style={[
            styles.image,
            {
              height: Math.min(
                height /
                  (width / (Dimensions.get('window').width * maxWidthRatio)),
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
      </Pressable>
      <Portal>
        <Modal
          contentContainerStyle={{
            flex: 1,
          }}
          onDismiss={() => setIsMaximized(false)}
          visible={isMaximized}
        >
          <PinchGestureHandler
            ref={imagePinch}
            simultaneousHandlers={imagePan}
            onGestureEvent={pinchHandler}
            style={{
              backgroundColor: Colors.black,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Animated.View
              style={{
                backgroundColor: Colors.black,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PanGestureHandler
                ref={imagePan}
                simultaneousHandlers={imagePinch}
                onGestureEvent={panHandler}
                style={{
                  backgroundColor: Colors.black,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Animated.View
                  style={{
                    backgroundColor: Colors.black,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Animated.View style={[styles.focalPoint, focalPointStyle]} />
                  <Animated.Image
                    style={[
                      styles.image,
                      {
                        height: newHeight,
                        width: newWidth,
                      },
                      pinchStyle,
                      { ...style },
                    ]}
                    resizeMode="contain"
                    source={{
                      uri: imageURI,
                    }}
                  />
                </Animated.View>
              </PanGestureHandler>
            </Animated.View>
          </PinchGestureHandler>
        </Modal>
      </Portal>
    </View>
  );
};

ResponsiveImage.propTypes = {
  imageURI: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  maxWidthRatio: PropTypes.number,
  maxHeightRatio: PropTypes.number,
  canMaximize: PropTypes.bool,
};

ResponsiveImage.defaultProps = {
  style: {},
  maxWidthRatio: 0.9,
  maxHeightRatio: 1,
  canMaximize: true,
};

export default ResponsiveImage;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width * 0.9,
    resizeMode: 'contain',
    marginBottom: Dimensions.get('window').height * 0.02,
  },

  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
    zIndex: 20,
    top: 0,
    left: 0,
  },
});
