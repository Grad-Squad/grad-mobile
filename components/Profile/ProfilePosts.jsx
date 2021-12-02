import React, { useContext } from 'react';
import { Animated } from 'react-native';
import PostsContainer from 'components/Post/PostsContainer';
import { apiFeedQueryKey, useAPIFeed } from 'api/endpoints/posts';
import ProfileContext from './ProfileContext';

const ProfilePosts = () => {
  const { offset } = useContext(ProfileContext);

  return (
    <PostsContainer
      reactQueryKey={apiFeedQueryKey}
      paginatedReactQuery={useAPIFeed}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: offset } } }],
        { useNativeDriver: true }
      )}
    />
  );
};

ProfilePosts.propTypes = {};
ProfilePosts.defaultProps = {};

export default ProfilePosts;
