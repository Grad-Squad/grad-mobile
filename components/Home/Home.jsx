import React from 'react';
import { StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { apiFeedQueryKey, useAPIFeed } from 'api/endpoints/posts';
import Post from 'components/Post/Post';
import PaginatedFlatList from 'common/PaginatedFlatList';
import Header from './Header';

const Home = () => (
  <Page>
    <Header />
    <PaginatedFlatList
      contentContainerStyle={styles.feedList}
      paginatedReactQuery={useAPIFeed}
      reactQueryKey={apiFeedQueryKey}
      renderItem={({
        item: { title, author, rating, createdAt, id, commentCount, materials },
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
        />
      )}
      errorLocalizationKey="Feed/Error:Couldn't load posts"
    />
  </Page>
);

Home.propTypes = {};
Home.defaultProps = {};

export default Home;

const styles = StyleSheet.create({
  feedList: {
    paddingVertical: 30,
  },
  post: {
    width: '90%',
    alignSelf: 'center',
  },
});
