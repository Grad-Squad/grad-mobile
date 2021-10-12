import { useMutation } from 'react-query';
import { useAxios } from 'api/AxiosProvider';
import { formatString } from 'utility';
import endpoints from './endpoints';

// eslint-disable-next-line import/prefer-default-export
export const useAPIAddComment = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async ({ postID, content }) => {
    const {
      data,
    } = await axios.post(formatString(endpoints.posts.comments,postID), {
        comment:{
            content,
        }
    });

    return data;
  }, mutationConfig);
};
