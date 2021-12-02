import { useAxios } from 'api/AxiosProvider';
import { useMutation } from 'react-query';
import { formatString } from 'utility';
import endpoints from './endpoints';

export const useAPIDeleteComment = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async ({ postId, commentId }) => {
    const { data } = await axios.delete(
      formatString(endpoints.posts.comment, postId, commentId)
    );

    return data;
  }, mutationConfig);
};

export const useAPIEditComment = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async ({ postId, commentId, content }) => {
    const { data } = await axios.patch(
      formatString(endpoints.posts.comment, postId, commentId),
      {
        content
      }
    );

    return data;
  }, mutationConfig);
};
