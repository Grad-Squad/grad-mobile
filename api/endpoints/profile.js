import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useAxios } from 'api/AxiosProvider';
import { formatString } from 'utility';
import endpoints from './endpoints';

export const getFollowersKey = 'profileFollowers';
export const useAPIGetProfileFollowers = (profileId) => {
  const { axios } = useAxios();
  return useInfiniteQuery(
    [getFollowersKey, profileId],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        formatString(endpoints.profile.followers, profileId),
        {
          params: {
            page: pageParam,
            limit: 10,
          },
        }
      );
      return data;
    },
    { getNextPageParam: (lastPage) => lastPage.nextPage }
  );
};

export const profileByIdQueryKey = (profileId) => ['profile by id', profileId];
export const useAPIGetProfileById = (profileId, options) => {
  const { axios } = useAxios();
  return useQuery(
    profileByIdQueryKey(profileId),
    async () => {
      const { data } = await axios.get(
        formatString(endpoints.profile.profileById, profileId)
      );
      return data;
    },
    options
  );
};

export const useFollowProfile = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async (profileId) => {
    const { data } = await axios.post(
      formatString(endpoints.profile.followProfile, profileId)
    );

    return data;
  }, mutationConfig);
};

export const useUnfollowProfile = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async (profileId) => {
    const { data } = await axios.delete(
      formatString(endpoints.profile.followProfile, profileId)
    );

    return data;
  }, mutationConfig);
};
