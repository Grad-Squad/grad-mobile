import { useMutation } from 'react-query';
import { useAxios } from 'api/AxiosProvider';
import { formatString } from 'utility';
import endpoints from './endpoints';

export const useAPIUpvotePost = (mutationConfig) =>{
  const { axios } = useAxios();
  return useMutation( async ({postId, ratingId}) => {
    const {
      data,
    } = await axios.patch(formatString(endpoints.posts.ratings,postId,ratingId), {
      type: 'upvoted',
  });
  return data;
  }, mutationConfig);
};

export const useAPIDownvotePost = (mutationConfig) =>{
  const { axios } = useAxios();
  return useMutation( async ({postId, ratingId}) => {
    const {
      data,
    } = await axios.patch(formatString(endpoints.posts.ratings,postId,ratingId), {
      type: 'downvoted',
  });
  return data;
  }, mutationConfig);
};

export const useAPIUnvotePost = (mutationConfig) =>{
  const { axios } = useAxios();
  return useMutation( async ({postId, ratingId}) => {
    const {
      data,
    } = await axios.patch(formatString(endpoints.posts.ratings,postId,ratingId), {
      type: 'none',
  });
  return data;
  }, mutationConfig);
};

export const useAPIUpvoteComment = (mutationConfig) =>{
  const { axios } = useAxios();
  return useMutation( async ({postId, ratingId}) => {
    const {
      data,
    } = await axios.patch(formatString(endpoints.comments.ratings,postId,ratingId), {
      type: 'upvoted',
  });
  return data;
  }, mutationConfig);
};

export const useAPIDownvoteComment = (mutationConfig) =>{
  const { axios } = useAxios();
  return useMutation( async ({postId, ratingId}) => {
    const {
      data,
    } = await axios.patch(formatString(endpoints.comments.ratings,postId,ratingId), {
      type: 'downvoted',
  });
  return data;
  }, mutationConfig);
};

export const useAPIUnvoteComment = (mutationConfig) =>{
  const { axios } = useAxios();
  return useMutation( async ({postId, ratingId}) => {
    const {
      data,
    } = await axios.patch(formatString(endpoints.comments.ratings,postId,ratingId), {
      type: 'none',
  });
  return data;
  }, mutationConfig);
};

