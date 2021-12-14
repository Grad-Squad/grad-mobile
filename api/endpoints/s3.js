import { useAxios } from 'api/AxiosProvider';
import { useMutation, useQuery } from 'react-query';
import { formatString } from 'utility';
import * as normalAxios from 'axios';
import { useStore } from 'globalStore/GlobalStore';
import endpoints from './endpoints';

// export const useAPIgetManyS3UploadLinks = (numberOfLinks, options) => {
//   const { axios } = useAxios();
//   return useQuery(
//     ['getManyS3UploadLinks'],
//     async () => {
//       const { data } = await axios.get(
//         formatString(endpoints.s3.getManyUploadLinks, numberOfLinks)
//       );
//       return data;
//     },
//     {
//       cacheTime: 0,
//       ...options,
//     }
//   );
// };
// export const useAPIgetOneS3UploadLinks = (options) => {
//   const { axios } = useAxios();
//   return useQuery(
//     ['getOneS3UploadLink'],
//     async () => {
//       const { data } = await axios.get(endpoints.s3.getOneUploadLink);
//       return data;
//     },
//     {
//       cacheTime: 0,
//       ...options,
//     }
//   );
// };
export const useAPIgetS3UploadImageLinks = (numberOfLinks=1,options) => {
  const { axios } = useAxios();
  return useQuery(
    ['getS3UploadImageLinks'],
    async () => {
      const { data } = await axios.get(
        formatString(endpoints.s3.getUploadImageLinks,numberOfLinks)
      );
      return data;
    },
    {
      cacheTime: 0,
      ...options,
    }
  );
};
export const useAPIgetS3UploadDocLinks = (numberOfLinks=1,options) => {
  const { axios } = useAxios();
  return useQuery(
    ['getS3UploadDocLinks'],
    async () => {
      const { data } = await axios.get(
        formatString(endpoints.s3.getUploadDocLinks,numberOfLinks)
      );
      return data;
    },
    {
      cacheTime: 0,
      ...options,
    }
  );
};
export const useAPIgetS3UploadVideoLinks = (numberOfLinks=1,options) => {
  const { axios } = useAxios();
  return useQuery(
    ['getS3UploadVideoLinks'],
    async () => {
      const { data } = await axios.get(
        formatString(endpoints.s3.getUploadVideoLinks,numberOfLinks)
      );
      return data;
    },
    {
      cacheTime: 0,
      ...options,
    }
  );
};
export const useDeleteUri = (mutationConfig) => {
  const { axios } = useAxios();
  const [store] = useStore();

  return useMutation(async (itemKey) => {
    const { data } = await axios.delete(
      formatString(endpoints.s3.deleteUri, `${store.profileId}%2F${itemKey}`)
    );
    return data;
  }, mutationConfig);
};


const formatFormData = (payload) => {
  const formData = new FormData(payload);
  formData.append('bucket', payload.bucket);
  formData.append('X-Amz-Algorithm', payload['X-Amz-Algorithm']);
  formData.append('X-Amz-Credential', payload['X-Amz-Credential']);
  formData.append('X-Amz-Date', payload['X-Amz-Date']);
  formData.append('key', payload.key);
  formData.append('Policy', payload.Policy);
  formData.append('X-Amz-Signature', payload['X-Amz-Signature']);

  formData.append('content-type', payload['content-type']);
  formData.append('file', {
    uri: payload.file.uri,
    name: payload.file.fileName,
    type: payload.file.type,
  });
  return formData;
};

export const useAPIUploadImage = (mutationConfig) =>
  useMutation(async ({ payload }) => {
    const formData = formatFormData(payload);
    const { data } = await normalAxios.post(endpoints.s3.uploadFile, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  }, mutationConfig);

export const useAPIGetFileUri = (itemKey, options) => {
  const { axios } = useAxios();
  return useQuery(
    ['S3FileKey', itemKey],
    async () => {
      const { data } = await axios.get(endpoints.s3.getFileUri);
      return data;
    },
    {
      ...options,
    }
  );
};
