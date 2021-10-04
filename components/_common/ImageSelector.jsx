import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { PressableIcon } from './Icon';

const ImageSelector = ({ setImage, ...props }) => {
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
    }
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <PressableIcon onPress={pickImage} name="AddImage" size={30} {...props} />
  );
};

ImageSelector.propTypes = {
  setImage: PropTypes.func.isRequired,
};
ImageSelector.defaultProps = {};

export default ImageSelector;