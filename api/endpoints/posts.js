import { useMutation } from 'react-query';
import { useAxios } from 'api/AxiosProvider';
import { formatString } from 'utility';
import endpoints from './endpoints';

export const useAPIAddComment = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async ({ postId, content }) => {
    const { data } = await axios.post(
      formatString(endpoints.posts.comments, postId),
      {
        comment: {
          content,
        },
      }
    );

    return data;
  }, mutationConfig);
};
