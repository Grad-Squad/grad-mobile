import { useAxios } from 'api/AxiosProvider';
import { useMutation } from 'react-query';
import { formatString } from 'utility';
import endpoints from './endpoints';

// eslint-disable-next-line import/prefer-default-export
export const useAPIDeleteComment = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async ({ postId, commentId }) => {
    const { data } = await axios.delete(
      formatString(endpoints.posts.comment, postId, commentId)
    );

    return data;
  }, mutationConfig);
};
