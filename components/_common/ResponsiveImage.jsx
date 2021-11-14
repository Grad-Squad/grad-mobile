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

const ResponsiveImage = ({
  imageURI,
  style,
  maxWidthRatio,
  maxHeightRatio,
  canMaximize,
}) => {
  const [height, setHeight] = useState(1);
  const [width, setWidth] = useState(1);

  const [newHeight, setNewHeight] = useState();
  const [newWidth, setNewWidth] = useState();
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <View>
      <Pressable
        onPress={() => {
          console.log(canMaximize);
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
          <View
            style={{
              backgroundColor: Colors.black,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              style={[
                styles.image,
                {
                  height: newHeight,
                  width: newWidth,
                },
                { ...style },
              ]}
              resizeMode="contain"
              source={{
                uri: imageURI,
              }}
            />
          </View>
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
});
