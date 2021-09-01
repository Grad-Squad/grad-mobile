import { useQuery, useMutation, useQueryClient } from 'react-query';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Post from './Post';
import { getPosts, getPostsById } from '../../api/posts';

const PostContainer = () => {
  //   const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery('posts', () => getPostsById(2));

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
