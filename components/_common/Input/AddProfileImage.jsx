import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';
import { useLocalization } from 'localization';
import { stylePropType } from 'proptypes';
import ImageSelector from 'common/ImageSelector';
import { useAPIgetS3UploadImageLinks, useAPIUploadImage } from 'api/endpoints/s3';
import LoadingIndicator from 'common/LoadingIndicator';
import RegisterContext from 'components/Register/RegisterContext';
import TitleText from './TitleText';

const AddProfileImage = ({ style, optional }) => {
  const { t } = useLocalization();
  const { formik } = useContext(RegisterContext);

  return (
    <View style={[styles.wrapper, style]}>
      <TitleText
        title={t('Register/Profile Picture')}
        subtitle={t('TextInput/optional')}
        showSubtitle={optional}
        style={styles.textGap}
      />
        <ImageSelector setImage={(value) => formik.setFieldValue('profilePicture',value)} isRegisteration/>
    </View>
  );
};

AddProfileImage.propTypes = {
  style: stylePropType,
  optional: PropTypes.bool,
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
