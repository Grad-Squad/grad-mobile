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
} from 'api/endpoints/bookmarks';
import { useStore } from 'globalStore/GlobalStore';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';

const MoveBookmarkButtons = ({
  postId,
  fromBookmarkId,
  toBookmarkId,
  inRootBookmark,
}) => {
  const { t } = useLocalization();
  const navigation = useNavigation();

  const store = useStore();

  const { showErrorSnackbar } = useErrorSnackbar();

  const movePostToBookmarkMutation = useMovePostToBookmark({
    onSuccess: (updatedParentBookmarkData) => {
      // todo
      // queryClient.setQueryData(
      //   getBookmarksFolderQueryKey(
      //     store.profileId,
      //     fromBookmarkId
      //   ),
      //   () => [updatedParentBookmarkData]
      // );
      queryClient.setQueryData(
        getBookmarksFolderQueryKey(
          store.profileId,
          inRootBookmark ? undefined : toBookmarkId
        ),
        () => [updatedParentBookmarkData]
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
  return (
    <View style={styles.actionsRow}>
      <TransparentButton
        text={t('BookmarksList/MoveBookmarkButtons/Cancel')}
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      />
      <MainActionButton
        text={t('BookmarksList/MoveBookmarkButtons/Move Here')}
        onPress={() =>
          movePostToBookmarkMutation.mutate({
            profileId: store.profileId,
            fromBookmarkId,
            postId,
            toBookmarkId,
          })
        }
        style={styles.moveButton}
        loading={movePostToBookmarkMutation.isLoading}
      />
    </View>
  );
};

MoveBookmarkButtons.propTypes = {
  postId: PropTypes.number.isRequired,
  fromBookmarkId: PropTypes.number.isRequired,
  toBookmarkId: PropTypes.number.isRequired,
  inRootBookmark: PropTypes.bool.isRequired,
};
MoveBookmarkButtons.defaultProps = {};

export default MoveBookmarkButtons;

const styles = StyleSheet.create({
  actionsRow: {
    flexDirection: 'row',

    margin: 10,
  },
  closeButton: { flex: 1 },
  moveButton: { flex: 3 },
});
