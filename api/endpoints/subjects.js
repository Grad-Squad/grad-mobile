import { useAxios } from 'api/AxiosProvider';
import { useQuery, useMutation } from 'react-query';
import endpoints from './endpoints';

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

export const useGetFavoriteSubjects = (options) => {
  const { axios } = useAxios();
  return useQuery(
    'favoriteSubjects',
    async () => {
      const { data } = await axios.get(endpoints.subjects.favoriteSubjects);
      return data;
    },
    options
  );
};

export const useUpdateFavoriteSubjects = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async (subjectIds) => {
    const { data } = await axios.put(endpoints.subjects.favoriteSubjects, {
      subjectIds,
    });
    return data;
  }, mutationConfig);
};
