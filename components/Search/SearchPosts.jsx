import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Post from 'components/Post/Post';
import { StyleSheet, View } from 'react-native';
import FollowerCardSkeleton from 'components/Profile/FollowerCardSkeleton';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import { Constants, Styles } from 'styles';
import PaginatedFlatList from 'common/PaginatedFlatList';
import { searchPostsQueryKey, useAPISearchPosts } from 'api/endpoints/search';
import { useSelector } from 'react-redux';
import SearchContext from './SearchContext';

const SearchPosts = ({ numOfPosts, listKey }) => {
  const { isLoading, searchText } = useContext(SearchContext);

  const { t } = useLocalization();
  const params = useSelector((state) => state.search.params);

  const renderItem = ({
    item: {
      title,
      author,
      rating,
      createdAt,
      id,
      commentCount,
      materials,
      subject,
    },
  }) => (
    <Post
      title={title}
      author={author}
      rating={rating}
      createdAt={createdAt}
      id={id}
      style={{ width: '90%', alignSelf: 'center' }}
      commentCount={commentCount}
      materials={materials}
      subject={subject}
      wasEdited={wasEdited}
    />
  );

  return (
    <>
      {isLoading ? (
        <FollowerCardSkeleton />
      ) : (
        <PaginatedFlatList
          ListHeaderComponent={
            !numOfPosts && <View style={styles.headerSpacing} />
          }
          maxNumOfItems={numOfPosts}
          paginatedReactQuery={useAPISearchPosts}
          paginatedReactQueryParams={[searchText]}
          hideNothingLeftToShow
          reactQueryKey={searchPostsQueryKey(searchText, params)}
          renderItem={renderItem}
          ListEmptyComponent={
            <EduText style={[Styles.errorText, styles.notFoundText]}>
              {t('Search/NoPosts')}
            </EduText>
          }
          listKey={listKey}
          errorLocalizationKey="Feed/Error:Couldn't load posts"
          SkeletonComponent={
            <>
              {Array(numOfPosts || 5)
                .fill()
                .map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <FollowerCardSkeleton key={index + 1} />
                ))}
            </>
          }
        />
      )}
    </>
  );
};

SearchPosts.propTypes = {
  listKey: PropTypes.string,
  numOfPosts: PropTypes.number,
};
SearchPosts.defaultProps = {
  numOfPosts: null,
  listKey: 'SearchPostsList',
};

export default SearchPosts;

const styles = StyleSheet.create({
  notFoundText: {
    textAlign: 'center',
  },
  headerSpacing: {
    marginTop: Constants.commonMargin * 2,
  },
});
