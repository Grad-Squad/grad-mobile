import React, { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { apiFeedQueryKey, useAPIFeed } from 'api/endpoints/posts';
import LoadingIndicator from 'common/LoadingIndicator';
import Post from 'components/Post/Post';
import QueryRefreshControl from 'common/QueryRefreshControl';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';
import Header from './Header';

const Home = () => {
  const { t } = useLocalization();
  const {
    data,
    isLoading,
    refetch,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useAPIFeed();

  const posts = useMemo(
    () => data?.pages.map((page) => page.data).flat(),
    [data]
  );

  return (
    <Page>
      <Header />
      {isLoading && <LoadingIndicator size="large" fullScreen />}
      {data && (
        <FlatList
          contentContainerStyle={styles.feedList}
          data={posts}
          renderItem={({ item: { title, author, rating, createdAt, id } }) => (
            <Post
              title={title}
              author={author}
              rating={rating}
              createdAt={createdAt}
              id={id}
              style={styles.post}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <QueryRefreshControl
              refetch={() => {
                queryClient.setQueryData(apiFeedQueryKey, (oldData) => ({
                  pageParams: [oldData.pageParams[0]],
                  pages: [oldData.pages[0]],
                }));
                refetch();
              }}
              isFetching={isFetching}
              isLoading={isLoading}
            />
          }
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          ListFooterComponent={
            isFetchingNextPage ? (
              <LoadingIndicator size="large" style={styles.footerLoading} />
            ) : (
              !hasNextPage && (
                <EduText style={styles.nothingLeftToShow}>
                  {t('FlatList/Nothing left to show')}
                </EduText>
              )
            )
          }
          initialNumToRender={5}
        />
      )}
    </Page>
  );
};

Home.propTypes = {};
Home.defaultProps = {};

export default Home;

const styles = StyleSheet.create({
  feedList: {
    paddingVertical: 15,
  },
  post: {
    width: '90%',
    alignSelf: 'center',
  },
  footerLoading: {
    paddingVertical: 5,
  },
  nothingLeftToShow: {
    textAlign: 'center',
    paddingVertical: 20,
  },
});
