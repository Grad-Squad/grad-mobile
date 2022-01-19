import { useAxios } from 'api/AxiosProvider';
import { useQuery } from 'react-query';
import { formatString } from 'utility';
import endpoints from './endpoints';

export const searchQueryKey = (searchText) => ['search text', searchText];
export const useAPIGetSearchResult = (searchText, options) => {
  const { axios } = useAxios();
  return useQuery(
    searchQueryKey(searchText),
    async () => {
      const { data } = await axios.get(
        formatString(endpoints.search.search, searchText)
      );
      return data;
    },
    options
  );
};
