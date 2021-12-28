import { useAxios } from 'api/AxiosProvider';
import { useQuery } from 'react-query';
import endpoints from './endpoints';

// eslint-disable-next-line import/prefer-default-export
export const useAPIGetSubjects = (options) => {
  const { axios } = useAxios();
  return useQuery(
    'subjects',
    async () => {
      const { data } = await axios.get(endpoints.subjects.subjects);
      return data;
    },
    options
  );
};
