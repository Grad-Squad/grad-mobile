import axios from './axiosInstance';

export const createAccount = async ({ name, email, password }) =>
  axios.post(`/auth/register`, {
    user: {
      email,
      password,
    },
    profile: {
      name,
    },
  });

export const tepm = 0;
