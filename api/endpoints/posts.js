import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useAxios } from 'api/AxiosProvider';
import { formatString } from 'utility';
import endpoints from './endpoints';

export const useAPIAddComment = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async ({ postID, content }) => {
    const { data } = await axios.post(
      formatString(endpoints.posts.comments, postID),
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

export const getCommentsKey = 'comments';
export const useAPIGetComments = (postID) => {
  const { axios } = useAxios();
  return useInfiniteQuery(
    [getCommentsKey, postID],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(formatString(endpoints.posts.comments, postID), {
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

export const useAPIDeleteComment = (postID, commentId, options) => {
  const { axios } = useAxios();
  return useMutation(async () => {
      const { data } = await axios.delete(
        formatString(endpoints.posts.commentsByID, postID ,commentId)
      );
      return data;
    },
    options
  );
};