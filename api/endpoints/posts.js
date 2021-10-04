import { useMutation } from 'react-query';
import { useAxios } from 'api/AxiosProvider';
import { formatString } from 'utility';
import endpoints from './endpoints';

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
