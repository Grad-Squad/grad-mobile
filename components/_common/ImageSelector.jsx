import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Platform, Pressable, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uriPropType } from 'proptypes';
import { PressableIcon } from './Icon';
import { IconNames } from './Icon/Icon';

const IMAGE_SOURCE = require('../../assets/images/input/AddProfilePictures.png');

const ImageSelector = ({ setImage, isRegisteration, prevImage, ...props }) => {
  const [selectedImage, setSelectedImage] = useState(prevImage);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Sorry, we need camera roll permissions to make this work!'
          ); // ! temp
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage({
        uri: result.uri,
        fileName: result.uri.substring(result.uri.lastIndexOf('/') + 1),
        width: result.width,
        height: result.height,
      });
      setSelectedImage(result);
    }
  };
  return (
    <>
      {isRegisteration ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Pressable onPress={pickImage} style={styles.button} {...props}>
          <Image
            style={styles.image}
            source={
              selectedImage
                ? {
                    uri: selectedImage.uri,
                  }
                : IMAGE_SOURCE
            }
          />
        </Pressable>
      ) : (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <PressableIcon
          onPress={pickImage}
          name={IconNames.AddImage}
          size={30}
          {...props}
        />
      )}
    </>
  );
};

ImageSelector.propTypes = {
  setImage: PropTypes.func.isRequired,
  isRegisteration: PropTypes.bool,
  prevImage: uriPropType,
};
ImageSelector.defaultProps = {
  isRegisteration: false,
  prevImage: null,
};

export default ImageSelector;

const styles = StyleSheet.create({
  image: { height: 110, width: 110, borderRadius: 110, alignSelf: 'center' },
  button: {
    alignSelf: 'center',
  },
});
