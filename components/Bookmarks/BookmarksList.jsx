import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { SectionList, StyleSheet, View } from 'react-native';
import {
  useGetBookmarksFolder,
  useGetSpecificBookmarksFolder,
} from 'api/endpoints/bookmarks';
import FillLoadingIndicator from 'common/FillLoadingIndicator';
import { useLocalization } from 'localization';
import { Constants } from 'styles';
import EduText from 'common/EduText';
import QueryRefreshControl from 'common/QueryRefreshControl';
import NoBookmarks from './NoBookmarks';
import BookmarksPostWrapper from './BookmarksPostWrapper';
import BookmarksFolder from './BookmarksFolder';
import BookmarksBreadCrumbs from './BookmarksBreadCrumbs';
import FoldersHeader from './FoldersHeader';
import AddFolderBottomSheet from './AddFolderBottomSheet';

const BookmarksList = ({ profileId }) => {

  const { t } = useLocalization();

  const [currentBookmarkId, setCurrentBookmarkId] = useState(undefined);
  const inRootBookmark =  currentBookmarkId === undefined
  const {
    data: parentData,
    isLoading: parentIsLoading,
    isError: parentIsError,
    isFetching: parentIsFetching,
    refetch: parentRefetch,
  } = useGetBookmarksFolder(profileId, {
    enabled: inRootBookmark,
  });

  const {
    data: currentBookmarkData,
    isLoading: currentBookmarkIsLoading,
    isError: currentBookmarkIsError,
    isFetching: currentBookmarkIsFetching,
    refetch: currentBookmarkRefetch,
  } = useGetSpecificBookmarksFolder(profileId, currentBookmarkId, {
    enabled: !inRootBookmark,
  });

  const isFetching = parentIsFetching || currentBookmarkIsFetching;
  const isLoading = parentIsLoading || currentBookmarkIsLoading;

  const [path, setPath] = useState([]);

  const data =
    inRootBookmark
      ? parentData?.[0]
      : currentBookmarkData?.[0];
  const { folders = [], posts = [] } = data || {};
  const refetch =
    inRootBookmark ? parentRefetch : currentBookmarkRefetch;
  const bookmarkId =
    inRootBookmark ? data?.id : currentBookmarkId;

  const bottomSheetRef = useRef(null);

  const sections = useMemo(
    () => [
      {
        id: 'folders',
        data: folders,
        renderItem: ({ item }) => (
          <BookmarksFolder
            name={item.title}
            onPress={() => {
              setPath((prev) => [...prev, item.title]);
              setCurrentBookmarkId(item.id);
            }}
          />
        ),
        ItemSeparatorComponent: () => <View style={styles.foldersSeparator} />,
        header: (
          <FoldersHeader
            onAddFolderPress={() => bottomSheetRef.current.expand()}
          />
        ),
        footer: folders.length === 0 && (
          <EduText style={styles.noItems}>
            {t('BookmarksList/NoItems/No Folders')}
          </EduText>
        ),
      },
      {
        id: 'posts',
        data: posts,
        renderItem: BookmarksPostWrapper,
        header: (
          <EduText style={styles.header}>{t('BookmarksList/Posts')}</EduText>
        ),
        footer: posts.length === 0 && (
          <EduText style={styles.noItems}>
            {t('BookmarksList/NoItems/No Bookmarked Posts')}
          </EduText>
        ),
      },
    ],
    [folders, posts]
  );

  if (isLoading) {
    // skeleton ?
    return <FillLoadingIndicator />;
  }

  if (folders.length + posts.length === 0 && inRootBookmark) {
    return <NoBookmarks />;
  }

  return (
    <>
      <SectionList
        sections={sections}
        ListHeaderComponent={
          <BookmarksBreadCrumbs
            path={path}
            onBackPress={() => {
              setCurrentBookmarkId(data.parent.id);
              setPath((prev) => prev.slice(0, -1));
            }}
          />
        }
        renderSectionHeader={({ section }) => section.header}
        renderSectionFooter={({ section }) => section.footer}
        keyExtractor={(item) => item.id}
        refreshControl={
          <QueryRefreshControl
            refetch={() => {
              refetch();
            }}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        }
        stickySectionHeadersEnabled={false}
      />
      <AddFolderBottomSheet
        bottomSheetRef={bottomSheetRef}
        profileId={profileId}
        parentBookmarkId={bookmarkId}
        inRootBookmark={inRootBookmark}
      />
    </>
  );
};

BookmarksList.propTypes = {
  profileId: PropTypes.number.isRequired,
};
BookmarksList.defaultProps = {};

export default BookmarksList;

const styles = StyleSheet.create({
  foldersSeparator: {
    marginTop: (Constants.commonMargin * 2) / 3,
  },
  header: {
    margin: Constants.commonMargin,
    marginBottom: Constants.commonMargin + 10,
  },
  noItems: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
