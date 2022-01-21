import React from 'react';
import Page from 'common/Page/Page';
import { apiFeedQueryKey, useAPIFeed } from 'api/endpoints/posts';
import PostsContainer from 'components/Post/PostsContainer';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';
import Header from './Header';
import FeedEmptyComponent from './FeedEmptyComponent';

const Home = () => (
  <Page>
    <Header />
    <PostsContainer
      reactQueryKey={apiFeedQueryKey}
      paginatedReactQuery={useAPIFeed}
      ListEmptyComponent={
        <FeedEmptyComponent
          onInterestsUpdated={() => {
            queryClient.invalidateQueries(apiFeedQueryKey);
          }}
        />
      }
    />
  </Page>
);

Home.propTypes = {};
Home.defaultProps = {};

export default Home;
