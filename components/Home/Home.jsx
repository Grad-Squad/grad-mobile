import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { useAPIFeed } from 'api/endpoints/posts';
import LoadingIndicator from 'common/LoadingIndicator';
import Post from 'components/Post/Post';
import Header from './Header';

const Home = () => {
  const { data, isLoading } = useAPIFeed();

  const posts = data?.pages[0].data;

  return (
    <Page>
      <Header />
      {isLoading && <LoadingIndicator size="large" fullScreen />}
      {posts && (
        <FlatList
          style={{ paddingVertical: 15 }}
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
        />
      )}
    </Page>
  );
};

Home.propTypes = {};
Home.defaultProps = {};

export default Home;

const styles = StyleSheet.create({});
