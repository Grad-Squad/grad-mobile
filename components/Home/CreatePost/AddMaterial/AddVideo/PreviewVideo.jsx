import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { useLocalization } from 'localization';
import { Styles } from 'styles';
import Separator from 'common/Separator';
import VideoPlayer from 'common/VideoPlayer';

const PreviewVideo = ({ fileName, uri, onRemoveFile }) => {
  const { t } = useLocalization();
  return (
    <>
      <View style={styles.fileNameRow}>
        <EduText style={styles.fileName}>
          {`${t('AddMaterial/Video/Video file name:')} ${fileName}`}
        </EduText>
        <PressableIcon name={IconNames.delete} onPress={onRemoveFile} />
      </View>
      <Separator style={styles.previewSeparator} />
      <EduText style={styles.preview}>{t('AddMaterial/Preview')}</EduText>
       <VideoPlayer uri={uri} />
    </>
  );
};

PreviewVideo.propTypes = {
  fileName: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  onRemoveFile: PropTypes.func.isRequired,
};
PreviewVideo.defaultProps = {};

export default PreviewVideo;

const styles = StyleSheet.create({
  fileNameRow: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  fileName: {
    ...Styles.underLinedFileName,

    marginLeft: 10,
    marginRight: 4,
  },
  previewSeparator: {
    marginTop: 20,
  },
  preview: {
    fontSize: 41,
    textAlign: 'center',

    marginBottom: 15,
  },
});
