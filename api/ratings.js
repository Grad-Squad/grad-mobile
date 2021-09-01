import axios from './axiosInstance';

export const upvotePost = async (postId, ratingId) =>
  axios.patch(`/posts/${postId}/ratings/${ratingId}`, {
    type: 'upvoted',
  });

export const downvotePost = async (postId, ratingId) =>
  axios.patch(`/posts/${postId}/ratings/${ratingId}`, {
    type: 'downvoted',
  });

export const unvotePost = async (postId, ratingId) =>
  axios.patch(`/posts/${postId}/ratings/${ratingId}`, {
    type: 'none',
  });

export const upvoteComment = async (commentId, ratingId) =>
  axios.patch(`/comments/${commentId}/ratings/${ratingId}`, {
    type: 'upvoted',
  });

export const downvoteComment = async (commentId, ratingId) =>
  axios.patch(`/comments/${commentId}/ratings/${ratingId}`, {
    type: 'downvoted',
  });

export const unvoteComment = async (commentId, ratingId) =>
  axios.patch(`/comments/${commentId}/ratings/${ratingId}`, {
    type: 'none',
  });
