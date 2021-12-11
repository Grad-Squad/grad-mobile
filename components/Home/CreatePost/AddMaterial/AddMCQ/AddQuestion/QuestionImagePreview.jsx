import React from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, View } from 'react-native';
import ResponsiveImage from 'common/ResponsiveImage';
import { useLocalization } from 'localization';
import EduText from 'common/EduText';
import PressableText from 'common/PressableText';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { Styles } from 'styles';

const QuestionImagePreview = ({ image, onDeletePress }) => {
  const { t } = useLocalization();
  return (
    <>
      <View style={styles.imageRow}>
        <View>
          <EduText style={styles.textInputGap}>
            {t('AddMaterial/image name: ')}
          </EduText>
          <PressableText
            onPress={() => Alert.alert('Image name click')}
            pressableProps={{
              style: [styles.uploadedFileName],
              disabled: true,
            }}
          >
            {image.fileName}
          </PressableText>
        </View>

        <PressableIcon
          onPress={onDeletePress}
          style={styles.deleteImage}
          name={IconNames.delete}
          size={30}
        />
      </View>
      <ResponsiveImage imageURI={image.uri} style={styles.imageStyle} />
    </>
  );
};

QuestionImagePreview.propTypes = {
  image: PropTypes.shape({
    fileName: PropTypes.string,
    uri: PropTypes.string,
  }).isRequired,
  onDeletePress: PropTypes.func.isRequired,
};
QuestionImagePreview.defaultProps = {};

export default QuestionImagePreview;

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  deleteImage: {
    flexShrink: 0,
    padding: 7,
    flexBasis: '18%',
    alignItems: 'center',
  },
  uploadedFileName: {
    ...Styles.underLinedFileName,

    marginTop: 4,

    alignSelf: 'flex-start',
  },
  textInputGap: {
    marginTop: 10,
  },
  imageStyle: {
    alignSelf: 'center',
  },
});
