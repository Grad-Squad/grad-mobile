import React from 'react';
import { SectionList, View } from 'react-native';
import { useLocalization } from 'localization';
import PostSkeleton from 'components/Post/PostSkeleton';
import EduText from 'common/EduText';
import { stylePropType } from 'proptypes';
import BookmarksFolderSkeleton from './BookmarksFolderSkeleton';
import FoldersHeader from './FoldersHeader';

const getListOfIds = (num) =>
  Array(num)
    .fill()
    .map((_, i) => ({ id: i }));

const BookmarksLoading = ({ foldersSeparatorStyle, headerStyle }) => {
  const { t } = useLocalization();
  return (
    <SectionList
      sections={[
        {
          id: 'folders',
          data: getListOfIds(2),
          renderItem: () => <BookmarksFolderSkeleton />,
          ItemSeparatorComponent: () => <View style={foldersSeparatorStyle} />,
          header: <FoldersHeader hideAdd />,
        },
        {
          id: 'posts',
          data: getListOfIds(1),
          renderItem: () => <PostSkeleton />,
          header: (
            <EduText style={headerStyle}>{t('BookmarksList/Posts')}</EduText>
          ),
        },
      ]}
      renderSectionHeader={({ section }) => section.header}
      keyExtractor={(item) => item.id}
    />
  );
};

BookmarksLoading.propTypes = {
  foldersSeparatorStyle: stylePropType,
  headerStyle: stylePropType,
};
BookmarksLoading.defaultProps = {
  foldersSeparatorStyle: {},
  headerStyle: {},
};

export default BookmarksLoading;
