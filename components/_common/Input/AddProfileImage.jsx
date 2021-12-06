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

  const [image, setImage] = useState({})
  const [uploadable, setUploadable] = useState(false)
  const isS3LinkEnabled = !!image?.uri;

  const uploadImageMutation = useAPIUploadImage();

  const {
    data: uploadLinkData,
    isSuccess: gettingUploadLinkSucceeded,
    refetch: refetchUploadLink,
    isLoadingUploadLink
  } = useAPIgetS3UploadImageLinks(1,{
    enabled: isS3LinkEnabled,
    onSuccess: () => {
      setUploadable(true)
    },
    onError: () => {},
  });

  useEffect(() => {
    if(uploadable && gettingUploadLinkSucceeded && uploadLinkData){
      setUploadable(false)
      const payload = {
        payload: {
          ...uploadLinkData[0].fields,
          'content-type': 'image/jpeg',
          file: {
            uri: image.uri,
            name: image.fileName,
            type: 'image/jpeg',
          },
        },
      };
      uploadImageMutation.mutate(payload, {
        onSuccess: () => {
          setImage({})
          const IMAGEOBJ = {key: uploadLinkData[0].fields.key, type: 'image'}
          formik.setFieldValue('profileImage',IMAGEOBJ)
        },
        onError: () => {
          // TODO retry
        },
      });
    }
  }, [gettingUploadLinkSucceeded, uploadLinkData, image, uploadImageMutation, uploadable, formik])

  return (
    <View style={[styles.wrapper, style]}>
      <TitleText
        title={t('Register/Profile Picture')}
        subtitle={t('TextInput/optional')}
        showSubtitle={optional}
        style={styles.textGap}
      />
      {
        isLoadingUploadLink || uploadImageMutation.isLoading
        ? <LoadingIndicator/>
        :
        <ImageSelector setImage={setImage} isRegisteration/>
      }
      {/* //! <Pressable onPress={onPress} style={styles.button}>
          //! <Image style={styles.image} source={IMAGE_SOURCE} />
          //! </Pressable>
        */}
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
