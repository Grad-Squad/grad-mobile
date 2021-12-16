import { useAxios } from 'api/AxiosProvider';
import { useMutation } from 'react-query';
import { formatString } from 'utility';
import endpoints from './endpoints';

export const useAPIForgotPassword = (mutationConfig) => {
  const { axios } = useAxios();

  return useMutation(async (email) => {
    const {
      data: { data },
    } = await axios.post(endpoints.auth.forgotPassword, {
      email: email.toLowerCase(),
    });

    return data;
  }, mutationConfig);
};

export const useAPIVerifyCode = (mutationConfig) => {
  const { axios } = useAxios();

  return useMutation(async ({ email, code }) => {
    const {
      data: { data },
    } = await axios.post(endpoints.auth.verifyCode, {
      email: email.toLowerCase(),
      '6_digit_code': code,
    });

    return data;
  }, mutationConfig);
};

export const useAPIChangePassword = (mutationConfig) => {
  const { axios } = useAxios();

  return useMutation(async ({ email, password, token }) => {
    const {
      data: { data },
    } = await axios.patch(formatString(endpoints.auth.changePassword, token), {
      email: email.toLowerCase(),
      password,
    });

    return data;
  }, mutationConfig);
};
