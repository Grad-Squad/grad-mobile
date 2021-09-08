import axios from './axiosInstance';

export const getPosts = async () => axios('/posts/2');
// todo temp gets one post. lesa nshoof el followers we kda

export const getPostsById = async (postId) => axios(`/posts/${postId}`);

export const createPost = async (postData) => {
  throw new Error('Not implemented');
};
// axios.post(`/posts`, {
//   ...postData,
// });

export const updatePost = async (postData) => {
  throw new Error('Not implemented');
};
// axios.post(`/posts`, {
//   ...postData,
// });

export const deletePost = async (postId) => axios.delete(`/posts/${postId}`);
