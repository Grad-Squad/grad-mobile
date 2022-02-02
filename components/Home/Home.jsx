import React, { useState } from 'react';
import Page from 'common/Page/Page';
import { apiFeedQueryKey, useAPIFeed } from 'api/endpoints/posts';
import PostsContainer from 'components/Post/PostsContainer';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';
import SearchBar from 'components/Search/SearchBar';
import FeedEmptyComponent from './FeedEmptyComponent';

const Home = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <Page>
      <SearchBar
        isActive={isSearchActive}
        setIsActive={setIsSearchActive}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
      />
      {!isSearchActive && !showHistory && (
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
      )}
    </Page>
  );
};

Home.propTypes = {};
Home.defaultProps = {};

export default Home;
