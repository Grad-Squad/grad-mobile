import { useAxios } from 'api/AxiosProvider';
import { useMutation } from 'react-query';
import { formatString } from 'utility';
import endpoints from './endpoints';

export const onSuccessUpdateTokens =
  (
    updateAccessToken,
    updateRefreshToken,
    addOnAccessTokenChangeCallback,
    mutationConfig
  ) =>
  (data, variables, context) => {
    addOnAccessTokenChangeCallback(() =>
      mutationConfig.onSuccess?.(data, variables, context)
    );
    updateAccessToken(data?.payload?.token);
    updateRefreshToken(data?.payload?.refresh_token);
  };

export const useAPILogin = (mutationConfig) => {
  const {
    axios,
    updateAccessToken,
    updateRefreshToken,
    addOnAccessTokenChangeCallback,
  } = useAxios();

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
      onSuccess: onSuccessUpdateTokens(
        updateAccessToken,
        updateRefreshToken,
        addOnAccessTokenChangeCallback,
        mutationConfig
      ),
    }
  );
};

export const useAPIfacebookLogin = (mutationConfig) => {
  const {
    axios,
    updateAccessToken,
    updateRefreshToken,
    addOnAccessTokenChangeCallback,
  } = useAxios();

  return useMutation(
    async ({ accessToken }) => {
      const {
        data: { data },
      } = await axios.get(`${endpoints.auth.facebookLogin}/${accessToken}`);

      return data;
    },
    {
      onSuccess: onSuccessUpdateTokens(
        updateAccessToken,
        updateRefreshToken,
        addOnAccessTokenChangeCallback,
        mutationConfig
      ),
    }
  );
};

export const useAPIGoogleLogin = (mutationConfig) => {
  const {
    axios,
    updateAccessToken,
    updateRefreshToken,
    addOnAccessTokenChangeCallback,
  } = useAxios();

  return useMutation(
    async (idToken) => {
      const {
        data: { data },
      } = await axios.get(`${endpoints.auth.googleLogin}/${idToken}`);

      return data;
    },
    {
      ...mutationConfig,
      onSuccess: onSuccessUpdateTokens(
        updateAccessToken,
        updateRefreshToken,
        addOnAccessTokenChangeCallback,
        mutationConfig
      ),
    }
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
  const { axios } = useAxios();
  return useMutation(
    async ({ email, password, name }) => {
      const { data } = await axios.post(endpoints.auth.register, {
        user: {
          email,
          password,
          identityProvider: 'lcl',
        },
        profile: {
          name,
        },
      });

      return data.data ? data.data : data;
    },
    {
      ...mutationConfig,
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
