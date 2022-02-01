import { useAxios } from 'api/AxiosProvider';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { formatString } from 'utility';
import endpoints from './endpoints';

export const searchQueryKey = (searchText, params) => [
  'search text',
  searchText,
  JSON.stringify(params),
];
export const useAPIGetSearchResult = (searchText, options) => {
  const { axios } = useAxios();
  const params = useSelector((state) => state.search.params);
  return useQuery(
    searchQueryKey(searchText, params),
    async () => {
      const { data } = await axios.get(
        formatString(endpoints.search.search, searchText),
        { params }
      );
      return data;
    },
    options
  );
};
