import {
  useGetBookmarksFolder,
  useGetSpecificBookmarksFolder,
} from 'api/endpoints/bookmarks';
import { useErrorSnackbar } from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import { useLocalization } from 'localization';

export default (profileId, currentBookmarkId) => {
  const { t } = useLocalization();

  const { showErrorSnackbar } = useErrorSnackbar();
  const onApiError = () => {
    showErrorSnackbar(t("BookmarksList/Couldn't get bookmarks, Try again"));
  };

  const inRootBookmark = currentBookmarkId === undefined;
  const {
    data: parentData,
    isLoading: parentIsLoading,
    isFetching: parentIsFetching,
    refetch: parentRefetch,
  } = useGetBookmarksFolder(profileId, {
    enabled: inRootBookmark,
    onError: onApiError,
  });

  const {
    data: currentBookmarkData,
    isLoading: currentBookmarkIsLoading,
    isFetching: currentBookmarkIsFetching,
    refetch: currentBookmarkRefetch,
  } = useGetSpecificBookmarksFolder(profileId, currentBookmarkId, {
    enabled: !inRootBookmark,
    onError: onApiError,
  });

  const isFetching = parentIsFetching || currentBookmarkIsFetching;
  const isLoading = parentIsLoading || currentBookmarkIsLoading;

  const data = inRootBookmark ? parentData?.[0] : currentBookmarkData?.[0];
  const { folders = [], posts = [] } = data || {};
  const refetch = inRootBookmark ? parentRefetch : currentBookmarkRefetch;
  const bookmarkId = inRootBookmark ? data?.id : currentBookmarkId;

  return {
    data,
    folders,
    posts,
    refetch,
    bookmarkId,
    isFetching,
    isLoading,
    inRootBookmark,
  };
};
