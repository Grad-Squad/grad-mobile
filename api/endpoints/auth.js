import { useAxios } from 'api/AxiosProvider';
import { useMutation } from 'react-query';
import endpoints from './endpoints';

export const useAPILogin = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async ({ email, password }) => {
    const {
      data: {
        data: { user },
      },
    } = await axios.post(endpoints.auth.login, {
      email,
      password,
    });

    return user;
  }, mutationConfig);
};
