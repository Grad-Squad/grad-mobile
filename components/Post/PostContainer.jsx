import { useQuery, useMutation, useQueryClient } from 'react-query';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Post from './Post';

const PostContainer = () => {
  //   const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery('posts', async () => {
    const response = await fetch('http://192.168.1.10:3000/posts/2');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  if (isLoading || isError) {
    return <View />;
    // todo render loading
  }
  console.log(data);

  return <Post postData={data} />;
};

PostContainer.propTypes = {};
PostContainer.defaultProps = {};

export default PostContainer;

const styles = StyleSheet.create({});
