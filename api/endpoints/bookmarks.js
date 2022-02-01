import { useAxios } from 'api/AxiosProvider';
import { useMutation, useQuery } from 'react-query';
import { formatString } from 'utility';
import endpoints from './endpoints';

export const useAddPostToBookmark = (mutationConfig) => {
  const { axios } = useAxios();

  return useMutation(async ({ profileId, postId }) => {
    const { data } = await axios.patch(
      formatString(endpoints.profile.AddPostToBookmark, profileId, postId)
    );

    return data;
  }, mutationConfig);
};
export const useMovePostToBookmark = (mutationConfig) => {
  const { axios } = useAxios();

  return useMutation(async ({ profileId, bookmarkId, postId }) => {
    const { data } = await axios.patch(
      formatString(
        endpoints.profile.MovePostToBookmark,
        profileId,
        bookmarkId,
        postId
      )
    );

    return data;
  }, mutationConfig);
};
export const useRemovePostToBookmark = (mutationConfig) => {
  const { axios } = useAxios();

  return useMutation(async ({ profileId, bookmarkId, postId }) => {
    const { data } = await axios.patch(
      formatString(
        endpoints.profile.RemovePostToBookmark,
        profileId,
        bookmarkId,
        postId
      )
    );

    return data;
  }, mutationConfig);
};

export const useCreateBookmarksFolder = (mutationConfig) => {
  const { axios } = useAxios();

  return useMutation(
    async ({ profileId, title, parentBookmarkId, isPublic }) => {
      const { data } = await axios.post(
        formatString(endpoints.profile.BookmarksFolder, profileId),
        {
          title,
          parent: parentBookmarkId,
          isPublic,
        }
      );

      return data;
    },
    mutationConfig
  );
};

export const useUpdateBookmarksFolder = (mutationConfig) => {
  const { axios } = useAxios();

  return useMutation(async ({ profileId, bookmarkId, body }) => {
    const { data } = await axios.patch(
      formatString(
        endpoints.profile.SpecificBookmarksFolder,
        profileId,
        bookmarkId
      ),
      body
    );

    return data;
  }, mutationConfig);
};

export const useRemoveBookmarksFolder = (mutationConfig) => {
  const { axios } = useAxios();

  return useMutation(async ({ profileId, bookmarkId }) => {
    const { data } = await axios.delete(
      formatString(
        endpoints.profile.SpecificBookmarksFolder,
        profileId,
        bookmarkId
      )
    );

    return data;
  }, mutationConfig);
};

export const getBookmarksFolderQueryKey = (profileId, bookmarkId) =>
  bookmarkId !== undefined
    ? ['bookmarksFolder', profileId, bookmarkId]
    : ['bookmarksFolder', profileId];

export const useGetBookmarksFolder = (profileId, queryOptions) => {
  const { axios } = useAxios();

  return useQuery(
    getBookmarksFolderQueryKey(profileId),
    async () => {
      const { data } = await axios.get(
        formatString(endpoints.profile.BookmarksFolder, profileId)
      );

      return data;
    },
    queryOptions
  );
};

export const useGetSpecificBookmarksFolder = (
  profileId,
  bookmarkId,
  queryOptions
) => {
  const { axios } = useAxios();

  return useQuery(
    getBookmarksFolderQueryKey(profileId, bookmarkId),
    async () => {
      const { data } = await axios.get(
        formatString(
          endpoints.profile.SpecificBookmarksFolder,
          profileId,
          bookmarkId
        )
      );

      return data;
    },
    queryOptions
  );
};
