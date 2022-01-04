import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { useLocalization } from 'localization';
import { Styles } from 'styles';
import Separator from 'common/Separator';
import PdfViewer from './PdfViewer';

const PreviewDocument = ({ fileName, uri, onRemoveFile }) => {
  const { t } = useLocalization();
  return (
    <>
      <View style={styles.fileNameRow}>
        <EduText style={styles.pdfFileName}>
          {`${t('AddMaterial/PDF/PDF file name:')} ${fileName}`}
        </EduText>
        <PressableIcon
          name={IconNames.delete}
          onPress={onRemoveFile}
          style={styles.delete}
        />
      </View>
      <Separator style={styles.previewSeparator} />
      <EduText style={styles.preview}>{t('AddMaterial/Preview')}</EduText>
      <PdfViewer uri={uri} />
    </>
  );
};

PreviewDocument.propTypes = {
  fileName: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  onRemoveFile: PropTypes.func.isRequired,
};
PreviewDocument.defaultProps = {};

export default PreviewDocument;

const styles = StyleSheet.create({
  fileNameRow: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  pdfFileName: {
    ...Styles.underLinedFileName,

    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 4,
  },
  previewSeparator: {
    marginTop: 20,
  },
  delete: {
    flexShrink: 0,
    padding: 7,
    flexBasis: '18%',
    alignItems: 'center',
  },
  preview: {
    fontSize: 41,
    textAlign: 'center',

    marginBottom: 15,
  },
});
