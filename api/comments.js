import axios from './axiosInstance';

export const getPaginatedComments = async (postId, { pageParam = 0 }) =>
  axios(`/posts/${postId}/comments?page=${pageParam}`);

export const createComment = async (postId, content) =>
  axios.post(`/posts/${postId}/comments`, {
    content,
  });

export const updateComment = async (postId, commentId, content) =>
  axios.patch(`/posts/${postId}/comments/${commentId}`, {
    content,
  });

export const deleteComment = async (postId, commentId) =>
  axios.delete(`/posts/${postId}/comments/${commentId}`);
