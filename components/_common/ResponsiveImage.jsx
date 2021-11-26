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
import ImageViewer from 'react-native-image-zoom-viewer';

const ResponsiveImage = ({
  imageURI,
  style,
  maxWidthRatio,
  maxHeightRatio,
  canMaximize,
}) => {
  const [height, setHeight] = useState(1);
  const [width, setWidth] = useState(1);

  const [newHeight, setNewHeight] = useState(0);
  const [newWidth, setNewWidth] = useState(0);

  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <View>
      <Pressable
        disabled={!canMaximize}
        onPress={() => {
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
              width: Dimensions.get('window').width * maxWidthRatio,
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
          contentContainerStyle={styles.modalContainer}
          onDismiss={() => setIsMaximized(false)}
          visible={isMaximized}
        >
          <ImageViewer
            enableSwipeDown
            onSwipeDown={() => setIsMaximized(false)}
            imageUrls={[
              {
                url: imageURI,
                width: newWidth,
                height: newHeight,
              },
            ]}
          />
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
    resizeMode: 'contain',
    marginBottom: Dimensions.get('window').height * 0.02,
  },

  modalContainer: {
    flex: 1,
  },
});
