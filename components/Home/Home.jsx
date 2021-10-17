import React, { useContext, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { useAPIFeed } from 'api/endpoints/posts';
import LoadingIndicator from 'common/LoadingIndicator';
import Post from 'components/Post/Post';
import QueryRefreshControl from 'common/QueryRefreshControl';
import EduText from 'common/EduText';
import { LocalizationContext } from 'localization';
import Header from './Header';

const Home = () => {
  const { t } = useContext(LocalizationContext);
  const {
    data,
    isLoading,
    refetch,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    remove,
  } = useAPIFeed();
    console.log("TLC: ~ file: Home.jsx ~ line 24 ~ Home ~ isFetchingNextPage", isFetchingNextPage)

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
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <QueryRefreshControl
              refetch={() => {
                remove();// temp
                refetch({ refetchPage: (page, index) => index === 0 });
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
              <LoadingIndicator size="large" style={styles.footerLoading} /> //sometimes it doesn't show
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
  footerLoading: {
    paddingVertical: 5,
  },
  nothingLeftToShow: {
    textAlign: 'center',
    paddingVertical: 20,
  },
});
