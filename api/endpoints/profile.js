import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useAxios } from 'api/AxiosProvider';
import { formatString } from 'utility';
import { useErrorSnackbar } from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import { useLocalization } from 'localization';
import endpoints from './endpoints';

export const getFollowersKey = (profileId) => ['profileFollowers', profileId];
export const useAPIGetProfileFollowers = (profileId) => {
  const { axios } = useAxios();
  return useInfiniteQuery(
    getFollowersKey(profileId),
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
  const { showErrorSnackbar } = useErrorSnackbar();
  const { t } = useLocalization();

  return useMutation(
    async (profileId) => {
      const { data } = await axios.post(
        formatString(endpoints.profile.followProfile, profileId)
      );

      return data;
    },
    {
      ...mutationConfig,
      onError: () => {
        showErrorSnackbar(t('Snackbar/Cannot follow user'));
        mutationConfig.onError();
      },
    }
  );
};

export const useUnfollowProfile = (mutationConfig) => {
  const { axios } = useAxios();
  const { showErrorSnackbar } = useErrorSnackbar();
  const { t } = useLocalization();

  return useMutation(
    async (profileId) => {
      const { data } = await axios.delete(
        formatString(endpoints.profile.followProfile, profileId)
      );

      return data;
    },
    {
      ...mutationConfig,
      onError: () => {
        showErrorSnackbar(t('Snackbar/Cannot unfollow user'));
        mutationConfig.onError();
      },
    }
  );
};
