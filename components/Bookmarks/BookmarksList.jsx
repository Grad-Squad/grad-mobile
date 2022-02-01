import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { SectionList, StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import { Constants } from 'styles';
import EduText from 'common/EduText';
import QueryRefreshControl from 'common/QueryRefreshControl';
import Post from 'components/Post/Post';
import NoBookmarks from './NoBookmarks';
import BookmarksFolder from './BookmarksFolder';
import BookmarksBreadCrumbs from './BookmarksBreadCrumbs';
import FoldersHeader from './FoldersHeader';
import AddFolderBottomSheet from './AddFolderBottomSheet';
import BookmarksLoading from './BookmarksLoading';
import FolderOptionsBottomSheet from './FolderOptionsBottomSheet';
import useGetBookmarks from './useGetBookmarks';

const BookmarksList = ({ profileId }) => {
  const { t } = useLocalization();

  const [currentBookmarkId, setCurrentBookmarkId] = useState(undefined);

  const {
    data,
    folders,
    posts,
    refetch,
    bookmarkId,
    isFetching,
    isLoading,
    inRootBookmark,
  } = useGetBookmarks(profileId, currentBookmarkId);

  const [path, setPath] = useState([]);

  const addFolderBottomSheetRef = useRef(null);
  const folderOptionsBottomSheetRef = useRef(null);

  const [selectedFolder, setSelectedFolder] = useState(undefined);

  const sections = useMemo(
    () => [
      {
        id: 'folders',
        data: folders,
        renderItem: ({ item }) => (
          <BookmarksFolder
            name={item.title}
            isPublic={item.isPublic}
            onPress={() => {
              setPath((prev) => [...prev, item.title]);
              setCurrentBookmarkId(item.id);
            }}
            onOptionsPress={() => {
              setSelectedFolder(item);
              addFolderBottomSheetRef.current.close();
              folderOptionsBottomSheetRef.current.expand();
            }}
          />
        ),
        ItemSeparatorComponent: () => <View style={styles.foldersSeparator} />,
        header: (
          <FoldersHeader
            onAddFolderPress={() => {
              folderOptionsBottomSheetRef.current.close();
              addFolderBottomSheetRef.current.expand();
            }}
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
        renderItem: ({
          item: {
            title,
            author,
            rating,
            createdAt,
            id,
            commentCount,
            materials,
          },
        }) => (
          <Post
            title={title}
            author={author}
            rating={rating}
            createdAt={createdAt}
            id={id}
            style={styles.post}
            commentCount={commentCount}
            materials={materials}
            bookmarkId={bookmarkId}
            inRootBookmark={inRootBookmark}
          />
        ),
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

  const showEditSheet = useCallback(() => {
    addFolderBottomSheetRef.current.expand();
  }, [addFolderBottomSheetRef]);

  const deselectFolder = useCallback(() => {
    setSelectedFolder(undefined);
  }, []);

  if (isLoading) {
    return (
      <BookmarksLoading
        foldersSeparatorStyle={styles.foldersSeparator}
        headerStyle={styles.header}
      />
    );
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
      <FolderOptionsBottomSheet
        bottomSheetRef={folderOptionsBottomSheetRef}
        showEditSheet={showEditSheet}
        selectedFolder={selectedFolder}
        profileId={profileId}
        parentBookmarkId={bookmarkId}
        inRootBookmark={inRootBookmark}
      />
      <AddFolderBottomSheet
        bottomSheetRef={addFolderBottomSheetRef}
        profileId={profileId}
        parentBookmarkId={bookmarkId}
        inRootBookmark={inRootBookmark}
        itemToEdit={selectedFolder}
        deselectFolder={deselectFolder}
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
  post: {
    width: '90%',
    alignSelf: 'center',
  },
});
