import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { MainActionButton, TransparentButton } from 'common/Input/Button';
import { useLocalization } from 'localization';
import { useNavigation } from '@react-navigation/native';
import { useErrorSnackbar } from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import {
  getBookmarksFolderQueryKey,
  useMovePostToBookmark,
  useUpdateBookmarksFolder,
} from 'api/endpoints/bookmarks';
import { useStore } from 'globalStore/GlobalStore';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';

const MoveBookmarkButtons = ({
  postId,
  fromBookmarkId,
  toBookmarkId,
  inRootBookmark,
  folderId,
}) => {
  const { t } = useLocalization();
  const navigation = useNavigation();

  const [store] = useStore();

  const { showErrorSnackbar } = useErrorSnackbar();

  const movePostToBookmarkMutation = useMovePostToBookmark({
    onSuccess: (updatedParentBookmarkData) => {
      queryClient.setQueryData(
        getBookmarksFolderQueryKey(
          store.profileId,
          inRootBookmark ? undefined : fromBookmarkId
        ),
        (oldData) => ({
          ...oldData,
          posts: oldData.posts.filter((item) => item.id !== postId),
        })
      );
      queryClient.setQueryData(
        getBookmarksFolderQueryKey(
          store.profileId,
          updatedParentBookmarkData.id
        ),
        () => updatedParentBookmarkData
      );
      navigation.goBack();
    },
    onError: () => {
      showErrorSnackbar(
        t(
          "BookmarksList/MoveBookmarkButtons/Couldn't move the bookmark, Try Again"
        )
      );
    },
  });

  const moveFolderMutation = useUpdateBookmarksFolder({
    onSuccess: (updatedMovedBookmarkData) => {
      queryClient.setQueryData(
        getBookmarksFolderQueryKey(store.profileId, folderId),
        () => updatedMovedBookmarkData
      );
      queryClient.setQueryData(
        getBookmarksFolderQueryKey(store.profileId, fromBookmarkId),
        (oldData) => ({
          ...oldData,
          folders: oldData.folders.filter((item) => item.id !== folderId),
        })
      );
      queryClient.setQueryData(
        getBookmarksFolderQueryKey(
          store.profileId,
          inRootBookmark ? undefined : toBookmarkId
        ),
        (oldData) => ({
          ...oldData,
          folders: [updatedMovedBookmarkData, ...oldData.folders],
        })
      );
      navigation.goBack();
    },
    onError: () => {
      showErrorSnackbar(
        t(
          "BookmarksList/MoveBookmarkButtons/Couldn't move the folder, Try Again"
        )
      );
    },
  });

  const onMovePress = () => {
    if (folderId !== undefined) {
      moveFolderMutation.mutate({
        profileId: store.profileId,
        bookmarkId: folderId,
        body: {
          parent: toBookmarkId,
        },
      });
    } else {
      movePostToBookmarkMutation.mutate({
        profileId: store.profileId,
        fromBookmarkId,
        postId,
        toBookmarkId,
      });
    }
  };

  return (
    <View style={styles.actionsRow}>
      <TransparentButton
        text={t('BookmarksList/MoveBookmarkButtons/Cancel')}
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      />
      <MainActionButton
        text={t('BookmarksList/MoveBookmarkButtons/Move Here')}
        onPress={onMovePress}
        style={styles.moveButton}
        loading={movePostToBookmarkMutation.isLoading}
      />
    </View>
  );
};

MoveBookmarkButtons.propTypes = {
  postId: PropTypes.number,
  fromBookmarkId: PropTypes.number.isRequired,
  toBookmarkId: PropTypes.number.isRequired,
  inRootBookmark: PropTypes.bool.isRequired,
  folderId: PropTypes.number,
};
MoveBookmarkButtons.defaultProps = {
  postId: undefined,
  folderId: undefined,
};

export default MoveBookmarkButtons;

const styles = StyleSheet.create({
  actionsRow: {
    flexDirection: 'row',

    margin: 10,
  },
  closeButton: { flex: 1 },
  moveButton: { flex: 3 },
});
