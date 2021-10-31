import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useAxios } from 'api/AxiosProvider';
import { formatString } from 'utility';
import endpoints from './endpoints';

export const useAPIAddComment = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async ({ postId, content }) => {
    const { data } = await axios.post({
      comment: {
        content,
      },
    });

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

export const useAPIGetComments = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async ({ postID }) => {
    const {
      data,
    } = await axios(formatString(endpoints.posts.comments,postID), {
    });

    return data;
  }, mutationConfig);
};

export const useAPIGetCommentsPaginated = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async ({ postID, page = 1, limit = 5 }) => {
    const { data } = await axios(
      formatString(endpoints.posts.comments, postID, page, limit),
      {}
    );

    return data;
  }, mutationConfig);
};

export const useAPIUpdatePost = (postId, mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async (post) => {
    const { data } = await axios.put(
      formatString(endpoints.posts.post, postId),
      post
    );

    return data;
  }, mutationConfig);
};

export const apiFeedQueryKey = 'feed';

export const useAPIFeed = () => {
  const { axios } = useAxios();
  return useInfiniteQuery(
    apiFeedQueryKey,
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(endpoints.posts.posts, {
        params: {
          page: pageParam,
          limit: 7,
        },
      });
      return data;
    },
    { getNextPageParam: (lastPage) => lastPage.nextPage }
  );
};

export const useAPIGetPostById = (postId, options) => {
  const { axios } = useAxios();
  return useQuery(
    ['postById', postId],
    async () => {
      const { data } = await axios.get(
        formatString(endpoints.posts.post, postId)
      );
      return data;
    },
    options
  );
};
