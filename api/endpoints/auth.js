import { useAxios } from 'api/AxiosProvider';
import { useMutation } from 'react-query';
import endpoints from './endpoints';

export const useAPILogin = (mutationConfig) => {
  const { axios, updateAccessToken, updateRefreshToken } = useAxios();

  return useMutation(
    async ({ email, password }) => {
      const {
        data: { data },
      } = await axios.post(endpoints.auth.login, {
        email,
        password,
      });

      return data;
    },
    {
      // ...mutationConfig,
      onSuccess: (data, variables, context) => {
        // todo el one line elli ta7t da sus
        mutationConfig.onSuccess?.(data, variables, context);
        updateAccessToken(data?.payload?.token);
        updateRefreshToken(data?.payload?.refresh_token);
      },
    }
  );
};

export const useAPIRefreshToken = (mutationConfig) => {
  const { updateRefreshToken } = useAxios();
  return useMutation(
    async ({ refreshToken }) => {
      const { data } = await axios.post(endpoints.auth.refresh, {
        refreshToken,
      });

      return data?.data?.payload?.token;
    },
    {
      ...mutationConfig,
      onSuccess: (data, variables, context) => {
        // todo el one line elli ta7t da sus
        mutationConfig.onSuccess?.(data, variables, context);

        updateRefreshToken(data?.data?.payload?.refresh_token);
      },
    }
  );
};

export const useAPIRegister = (mutationConfig) => {
  const { updateAccessToken, updateRefreshToken } = useAxios();
  return useMutation(
    async ({ email, password, name }) => {
      const {
        data: {
          data: { user },
        },
      } = await axios.post(endpoints.auth.register, {
        user: {
          email,
          password,
        },
        profile: {
          name,
        },
      });

      return user;
    },
    {
      ...mutationConfig,
      onSuccess: (data, variables, context) => {
        // todo el one line elli ta7t da sus
        mutationConfig.onSuccess?.(data, variables, context);

        updateAccessToken(data?.data?.payload?.token);
        updateRefreshToken(data?.data?.payload?.refresh_token);
      },
    }
  );
};

export const useAPIUpdateAccount = (mutationConfig) => {
  // const { axios } = useAxios();
  return useMutation(async ({ userInfo, profileId }) => {
    const {
      data: {
        data: { user },
      },
    } = await axios.post(endpoints.auth.register, {
      user: {
        ...userInfo,
      },
      profile: {
        name,
      },
    });

    return user;
  }, mutationConfig);
};
