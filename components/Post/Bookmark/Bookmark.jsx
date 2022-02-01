import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import EduText from 'common/EduText';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import {
  getBookmarksFolderQueryKey,
  useAddPostToBookmark,
} from 'api/endpoints/bookmarks';
import { useErrorSnackbar } from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import { useLocalization } from 'localization';
import { useStore } from 'globalStore/GlobalStore';
import { useBookmarkSavedSnackbar } from 'components/BookmarkSavedSnackbar/BookmarkSavedSnackbarProvider';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';
import { BOOKMARK_HIT_SLOP_OBJECT } from '../../../constants';

function Bookmark({ postId }) {
  const { t } = useLocalization();
  const [store] = useStore();

  const [isSaved, setIsSaved] = useState(false);

  const { showErrorSnackbar } = useErrorSnackbar();
  const { showBookmarkSavedSnackbar } = useBookmarkSavedSnackbar();

  const addPostToBookmarkMutation = useAddPostToBookmark({
    onSuccess: (bookmarkData) => {
      setIsSaved(true);
      showBookmarkSavedSnackbar(postId, bookmarkData.id);
      queryClient.setQueryData(
        getBookmarksFolderQueryKey(store.profileId, undefined),
        () => [bookmarkData]
      );
    },
    onError: () => {
      showErrorSnackbar(t("Snackbar/Couldn't save Post, Try Again"));
    },
  });

  const onPress = () => {
    addPostToBookmarkMutation.mutate({ profileId: store.profileId, postId });
  };

  return (
    <TouchableOpacity
      style={styles.BookmarkContainer}
      onPress={onPress}
      hitSlop={BOOKMARK_HIT_SLOP_OBJECT}
      disabled={addPostToBookmarkMutation.isLoading}
    >
      <Icon name={isSaved ? IconNames.bookmarkFilled : IconNames.bookmark} />
      <EduText>{t('Post/save')}</EduText>
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

export default React.memo(Bookmark);

Bookmark.propTypes = {
  postId: PropTypes.number.isRequired,
};
Bookmark.defaultProps = {};
