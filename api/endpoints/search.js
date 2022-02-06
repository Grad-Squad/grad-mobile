import { useAxios } from 'api/AxiosProvider';
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { formatString } from 'utility';
import endpoints from './endpoints';

export const searchPeopleQueryKey = (searchText, params) => [
  'search text people',
  searchText,
  JSON.stringify(params),
];
export const useAPISearchPeople = (searchText, options) => {
  const { axios } = useAxios();
  const params = useSelector((state) => state.search.params);
  return useInfiniteQuery(
    searchPeopleQueryKey(searchText, params),
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        formatString(endpoints.search.search, searchText),
        {
          params: {
            ...params,
            postslimit: 1,
            profilesLimit: 10,
            postsPage: 1,
            profilesPage: pageParam,
          },
        }
      );
      return data.profiles;
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextPage,
      ...options,
    }
  );
};

export const searchPostsQueryKey = (searchText, params) => [
  'search text posts',
  searchText,
  JSON.stringify(params),
];
export const useAPISearchPosts = (searchText, options) => {
  const { axios } = useAxios();
  const params = useSelector((state) => state.search.params);
  return useInfiniteQuery(
    searchPostsQueryKey(searchText, params),
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        formatString(endpoints.search.search, searchText),
        {
          params: {
            ...params,
            postslimit: 10,
            profilesLimit: 1,
            postsPage: pageParam,
            profilesPage: 1,
          },
        }
      );
      return data.posts;
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextPage,
      ...options,
    }
  );
};
