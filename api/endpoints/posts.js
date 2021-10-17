import { useInfiniteQuery, useMutation } from 'react-query';
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

export const useAPICreatePost = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async (post) => {
    const { data } = await axios.post(endpoints.posts.create, {
      post,
    });

    return data;
  }, mutationConfig);
};

export const useAPIFeed = () => {
  const { axios } = useAxios();
  return useInfiniteQuery(
    'feed',
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(endpoints.posts.posts, {
        params: {
          page: pageParam,
          limit: 5,
        },
      });
      return data;
    },
    { getNextPageParam: (lastPage) => lastPage.nextPage }
  );
};
