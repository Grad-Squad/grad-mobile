import React, { useContext } from 'react';
import { Animated } from 'react-native';
import PostsContainer from 'components/Post/PostsContainer';
import {
  getApiProfileFeedQueryKey,
  useAPIFeedByProfileId,
} from 'api/endpoints/posts';
import ProfileContext from './ProfileContext';

const ProfilePosts = () => {
  const { offset, profileId } = useContext(ProfileContext);

  return (
    <PostsContainer
      reactQueryKey={() => getApiProfileFeedQueryKey(profileId)}
      paginatedReactQuery={useAPIFeedByProfileId}
      paginatedReactQueryParams={[profileId]}
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
