import { useAxios } from 'api/AxiosProvider';
import { useQuery } from 'react-query';
import endpoints from './endpoints';

// eslint-disable-next-line import/prefer-default-export
export const useAPIGetTags = (options) => {
  const { axios } = useAxios();
  return useQuery(
    'tags',
    async () => {
      const { data } = await axios.get(endpoints.tags.tags);
      return data;
    },
    options
  );
};
