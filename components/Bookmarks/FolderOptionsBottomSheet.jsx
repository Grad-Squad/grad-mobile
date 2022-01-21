import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import BottomSheet from '@gorhom/bottom-sheet';
import { TransparentButton } from 'common/Input/Button';
import EduText from 'common/EduText';
import { Colors } from 'styles';

const snapPoints = ['28%'];
const FolderOptionsBottomSheet = ({ bottomSheetRef, selectedFolder }) => {
  const { t } = useLocalization();
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      <View style={styles.container}>
        {selectedFolder && (
          <EduText style={styles.folderName}>{selectedFolder.title}</EduText>
        )}
        <TransparentButton
          text={t('BookmarksList/FolderOptionsBottomSheet/Edit Folder')}
          onPress={() => bottomSheetRef.current.close()}
          style={styles.button}
          textStyle={styles.buttonText}
        />
        <TransparentButton
          text={t('BookmarksList/FolderOptionsBottomSheet/Delete Folder')}
          onPress={() => bottomSheetRef.current.close()}
          style={styles.button}
          textStyle={[styles.buttonText, styles.deleteText]}
        />
        <TransparentButton
          text={t('BookmarksList/FolderOptionsBottomSheet/Cancel')}
          onPress={() => bottomSheetRef.current.close()}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </BottomSheet>
  );
};

FolderOptionsBottomSheet.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  bottomSheetRef: PropTypes.object.isRequired,
  selectedFolder: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};
FolderOptionsBottomSheet.defaultProps = { selectedFolder: undefined };

export default React.memo(FolderOptionsBottomSheet);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flex: 1,
  },
  folderName: {
    fontSize: 25,
    fontFamily: 'Poppins_400Regular',

    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 18,
  },
  deleteText: {
    color: Colors.removalWarning,
  },
});
