import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';
import { LocalizationContext } from 'localization';
import TitleText from './TitleText';

const IMAGE_SOURCE = require('../../../assets/images/input/AddProfilePictures.png');

const AddProfileImage = ({ style, optional, onPress }) => {
  const { t } = useContext(LocalizationContext);
  return (
    <View style={[styles.wrapper, style]}>
      <TitleText
        title={t('Register/Profile Picture')}
        subtitle={t('TextInput/optional')}
        showSubtitle={optional}
        style={styles.textGap}
      />

      <Pressable onPress={onPress} style={styles.button}>
        <Image style={styles.image} source={IMAGE_SOURCE} />
      </Pressable>
    </View>
  );
};

AddProfileImage.propTypes = {
  style: ViewPropTypes.style,
  optional: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};
AddProfileImage.defaultProps = { style: {}, optional: false };

export default AddProfileImage;

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  textGap: { marginBottom: 10 },
  image: { height: 110, width: 110, alignSelf: 'center' },
  button: {
    alignSelf: 'center',
  },
});
