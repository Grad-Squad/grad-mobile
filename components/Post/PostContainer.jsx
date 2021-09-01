import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from 'react-query';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Post from './Post';
import { getPosts, getPostsById } from '../../api/posts';
import { getPaginatedComments } from '../../api/comments';

const PostContainer = () => {
  // todo put this in a flatlist
  const { isLoading, isError, data } = useQuery('posts', () => getPostsById(2));

  // todo move this call to expanded post
  const {
    data: commentsData,
    error,
    fetchNextPage: onLoadMoreCommentsHandler,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    'comments',
    ({ pageParam }) => getPaginatedComments(2, { pageParam }),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    }
  );

  if (isLoading || isError) {
    return <View />;
    // todo render loading
  }
  return <Post postData={data.data} />;
};

PostContainer.propTypes = {};
PostContainer.defaultProps = {};

export default PostContainer;

const styles = StyleSheet.create({});
