import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import BottomSheet from '@gorhom/bottom-sheet';
import { TransparentButton } from 'common/Input/Button';
import EduText from 'common/EduText';
import { Colors } from 'styles';
import {
  getBookmarksFolderQueryKey,
  useRemoveBookmarksFolder,
} from 'api/endpoints/bookmarks';
import { useErrorSnackbar } from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';
import BaseAlert from 'common/alerts/BaseAlert';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from 'navigation/ScreenNames';

const snapPoints = ['32%'];
const FolderOptionsBottomSheet = ({
  bottomSheetRef,
  showEditSheet,
  selectedFolder,
  profileId,
  inRootBookmark,
  parentBookmarkId,
}) => {
  const navigation = useNavigation();
  const { t } = useLocalization();

  const { showErrorSnackbar } = useErrorSnackbar();

  const removeBookmarksFolderMutation = useRemoveBookmarksFolder({
    onSuccess: () => {
      queryClient.setQueryData(
        getBookmarksFolderQueryKey(
          profileId,
          inRootBookmark ? undefined : parentBookmarkId
        ),
        (oldData) => ({
          ...oldData,
          folders: oldData.folders.filter(
            (item) => item.id !== selectedFolder.id
          ),
        })
      );
      bottomSheetRef.current.close();
    },
    onError: () => {
      showErrorSnackbar(
        t(
          "BookmarksList/FolderOptionsBottomSheet/Couldn't Delete Folder, Try again"
        )
      );
    },
  });

  const { isLoading } = removeBookmarksFolderMutation;

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
          onPress={() => {
            showEditSheet();
            bottomSheetRef.current.close();
          }}
          style={styles.button}
          textStyle={styles.buttonText}
          disabled={isLoading}
        />
        <TransparentButton
          text={t('BookmarksList/FolderOptionsBottomSheet/Move Folder')}
          onPress={() => {
            navigation.navigate(ScreenNames.MOVE_BOOKMARK, {
              bookmarkId: parentBookmarkId,
              folderId: selectedFolder.id,
            });
            bottomSheetRef.current.close();
          }}
          style={styles.button}
          textStyle={styles.buttonText}
          disabled={isLoading}
        />
        <TransparentButton
          text={t('BookmarksList/FolderOptionsBottomSheet/Delete Folder')}
          onPress={() => {
            BaseAlert(t, 'Confirm Delete Bookmarks Folder?', () => {
              removeBookmarksFolderMutation.mutate({
                profileId,
                bookmarkId: selectedFolder.id,
              });
            });
          }}
          style={styles.button}
          textStyle={[styles.buttonText, styles.deleteText]}
          disabled={isLoading}
          loading={isLoading}
        />
        <TransparentButton
          text={t('BookmarksList/FolderOptionsBottomSheet/Cancel')}
          onPress={() => bottomSheetRef.current.close()}
          style={styles.button}
          textStyle={styles.buttonText}
          disabled={isLoading}
        />
      </View>
    </BottomSheet>
  );
};

FolderOptionsBottomSheet.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  bottomSheetRef: PropTypes.object.isRequired,
  showEditSheet: PropTypes.func.isRequired,
  selectedFolder: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  profileId: PropTypes.number.isRequired,
  parentBookmarkId: PropTypes.number.isRequired,
  inRootBookmark: PropTypes.bool.isRequired,
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
