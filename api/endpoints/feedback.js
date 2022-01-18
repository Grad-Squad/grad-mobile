import { useAxios } from 'api/AxiosProvider';
import { useMutation } from 'react-query';
import endpoints from './endpoints';

// eslint-disable-next-line import/prefer-default-export
export const useAPISendFeedback = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async (feedback) => {
    const { data } = await axios.post(
      endpoints.feedback.feedback,
      feedback
    );
    return data;
  }, mutationConfig);
};
