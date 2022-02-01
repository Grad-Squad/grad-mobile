import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import EduText from 'common/EduText';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import {
  getBookmarksFolderQueryKey,
  useRemovePostToBookmark,
} from 'api/endpoints/bookmarks';
import { useErrorSnackbar } from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import { useLocalization } from 'localization';
import { useStore } from 'globalStore/GlobalStore';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';
import { BOOKMARK_HIT_SLOP_OBJECT } from '../../../constants';

function BookmarkRemove({ postId, bookmarkId, inRootBookmark }) {
  const { t } = useLocalization();
  const [store] = useStore();

  const { showErrorSnackbar } = useErrorSnackbar();

  const removePostToBookmarkMutation = useRemovePostToBookmark({
    onSuccess: (updatedParentBookmarkData) => {
      queryClient.setQueryData(
        getBookmarksFolderQueryKey(
          store.profileId,
          inRootBookmark ? undefined : updatedParentBookmarkData.id
        ),
        () => [updatedParentBookmarkData]
      );
    },
    onError: () => {
      showErrorSnackbar(t("Snackbar/Couldn't remove the bookmark, Try Again"));
    },
  });

  const onPress = () => {
    removePostToBookmarkMutation.mutate({
      profileId: store.profileId,
      bookmarkId,
      postId,
    });
  };

  return (
    <TouchableOpacity
      style={styles.BookmarkContainer}
      onPress={onPress}
      hitSlop={BOOKMARK_HIT_SLOP_OBJECT}
      disabled={removePostToBookmarkMutation.isLoading}
    >
      <Icon name={IconNames.bookmarkFilled} />
      <EduText>{t('Post/remove')}</EduText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  BookmarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 60,
  },
});

export default React.memo(BookmarkRemove);

BookmarkRemove.propTypes = {
  postId: PropTypes.number.isRequired,
  bookmarkId: PropTypes.number,
  inRootBookmark: PropTypes.bool.isRequired,
};
BookmarkRemove.defaultProps = { bookmarkId: undefined };
