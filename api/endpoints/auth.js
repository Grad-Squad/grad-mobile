import { useAxios } from 'api/AxiosProvider';
import { useMutation } from 'react-query';
import { formatString } from 'utility';
import endpoints from './endpoints';

const onSuccessUpdateTokens = (mutationConfig) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { updateAccessToken, updateRefreshToken } = useAxios();
  return (data, variables, context) => {
    mutationConfig.onSuccess?.(data, variables, context);
    updateAccessToken(data?.payload?.token);
    updateRefreshToken(data?.payload?.refresh_token);
  };
};

export const useAPILogin = (mutationConfig) => {
  const { axios } = useAxios();

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
      onSuccess: onSuccessUpdateTokens(mutationConfig),
    }
  );
};

export const useAPIfacebookLogin = (mutationConfig) => {
  const { axios } = useAxios();

  return useMutation(
    async ({ accessToken }) => {
      const {
        data: { data },
      } = await axios.get(`${endpoints.auth.facebookLogin}/${accessToken}`);

      return data;
    },
    {
      onSuccess: onSuccessUpdateTokens(mutationConfig),
    }
  );
};

export const useAPIGoogleLogin = (mutationConfig) => {
  const { axios } = useAxios();

  return useMutation(
    async ({ accessToken }) => {
      const {
        data: { data },
      } = await axios.get(`${endpoints.auth.googleLogin}/${accessToken}`);

      return data;
    },
    { ...mutationConfig, onSuccess: onSuccessUpdateTokens(mutationConfig) }
  );
};

export const useAPIRefreshToken = (mutationConfig) => {
  const { axios, updateRefreshToken } = useAxios();
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
  const { axios, updateAccessToken, updateRefreshToken } = useAxios();
  return useMutation(
    async ({ email, password, name }) => {
      const { data } = await axios.post(endpoints.auth.register, {
        user: {
          email,
          password,
        },
        profile: {
          name,
        },
      });

      return data.data ? data.data : data;
    },
    {
      ...mutationConfig,
      onSuccess: (data, variables, context) => {
        // todo el one line elli ta7t da sus
        mutationConfig.onSuccess?.(data, variables, context);

        if (data?.payload?.token) {
          updateAccessToken(data?.payload?.token);
        }
        if (data?.payload?.refresh_token) {
          updateRefreshToken(data?.payload?.refresh_token);
        }
      },
    }
  );
};

export const useAPIUpdateProfile = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async ({ profileInfo, profileId }) => {
    const { data } = await axios.patch(
      formatString(endpoints.profile.update, profileId),
      profileInfo
    );

    return data;
  }, mutationConfig);
};
