import { useInfiniteQuery, useMutation } from 'react-query';
import { useAxios } from './axiosInstance';

export const useComments = () => {
  const axios = useAxios();

  const getPaginatedComments = async (postId, { pageParam = 0 }) =>
    axios(`/posts/${postId}/comments?page=${pageParam}`);

  const createComment = async (postId, content) =>
    axios.post(`/posts/${postId}/comments`, {
      content,
    });

  const updateComment = async (postId, commentId, content) =>
    axios.patch(`/posts/${postId}/comments/${commentId}`, {
      content,
    });

  const deleteComment = async (postId, commentId) =>
    axios.delete(`/posts/${postId}/comments/${commentId}`);

  return { getPaginatedComments, createComment, updateComment, deleteComment };
};

export const useGetPaginatedComments = (postId) => {
  const axios = useAxios();
  return useInfiniteQuery(
    ['comments', postId],
    async ({ pageParam = 0 }) =>
      axios(`/posts/${postId}/comments?page=${pageParam}`),
    // eslint-disable-next-line no-unused-vars
    { getNextPageParam: (lastPage, pages) => lastPage.nextPage }
  );
};

export const useCreateComment = (postId, content, mutationOptions) => {
  const axios = useAxios();
  return useMutation(
    async () =>
      axios.post(`/posts/${postId}/comments`, {
        content,
      }),
    mutationOptions
  );
};

export const useUpdateComment = (
  postId,
  commentId,
  content,
  mutationOptions
) => {
  const axios = useAxios();
  return useMutation(
    async () =>
      axios.patch(`/posts/${postId}/comments/${commentId}`, {
        content,
      }),
    mutationOptions
  );
};

export const useDeleteComment = (postId, commentId, mutationOptions) => {
  const axios = useAxios();
  return useMutation(
    async () => axios.delete(`/posts/${postId}/comments/${commentId}`),
    mutationOptions
  );
};

// export const getPaginatedComments = async (postId, { pageParam = 0 }) =>
//   axios(`/posts/${postId}/comments?page=${pageParam}`);

// export const createComment = async (postId, content) =>
//   axios.post(`/posts/${postId}/comments`, {
//     content,
//   });

// export const updateComment = async (postId, commentId, content) =>
//   axios.patch(`/posts/${postId}/comments/${commentId}`, {
//     content,
//   });

// export const deleteComment = async (postId, commentId) =>
//   axios.delete(`/posts/${postId}/comments/${commentId}`);
