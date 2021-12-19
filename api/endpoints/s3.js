import { useAxios } from 'api/AxiosProvider';
import { useMutation, useQuery } from 'react-query';
import { formatString } from 'utility';
import * as normalAxios from 'axios';
import { useSelector } from 'react-redux';
import { useStore } from 'globalStore/GlobalStore';
import getMimeTypeFromFileName from 'constants/mimeTypes';
import endpoints from './endpoints';

const useAPIGetS3UploadLink = (
  queryKey,
  endpoint,
  numberOfLinks = 1,
  options
) => {
  const { axios } = useAxios();
  return useQuery(
    queryKey,
    async () => {
      const { data } = await axios.get(formatString(endpoint, numberOfLinks));
      return data;
    },
    {
      cacheTime: 0,
      ...options,
    }
  );
};

export const useAPIgetS3UploadImageLinks = (numberOfLinks = 1, options) =>
  useAPIGetS3UploadLink(
    'getS3UploadImageLinks',
    endpoints.s3.getUploadImageLinks,
    numberOfLinks,
    options
  );

export const useAPIgetS3UploadDocLinks = (numberOfLinks = 1, options) =>
  useAPIGetS3UploadLink(
    'getS3UploadDocLinks',
    endpoints.s3.getUploadDocLinks,
    numberOfLinks,
    options
  );

export const useAPIgetS3UploadVideoLinks = (numberOfLinks = 1, options) =>
  useAPIGetS3UploadLink(
    'getS3UploadVideoLinks',
    endpoints.s3.getUploadVideoLinks,
    numberOfLinks,
    options
  );

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
    name: payload.file.name,
    type: payload.file.type,
  });
  return formData;
};

export const useAPIBulkUploadFiles = (updateProgress, mutationConfig) => {
  const fileUploads = useSelector((state) => state.createPost.fileUploads);
  return useMutation(async ({ s3Replies, fileType }) => {
    const filteredFiles = fileUploads.filter(
      (file) => file.fileType === fileType
    );
    const formDatas = filteredFiles
      .map((filteredFile, index) => ({
        ...s3Replies[index].fields,
        'content-type': getMimeTypeFromFileName(filteredFile.file.fileName),
        file: {
          uri: filteredFile.file.uri,
          name: filteredFile.file.fileName,
          type: getMimeTypeFromFileName(filteredFile.file.fileName),
        },
      }))
      .map((payload) => formatFormData(payload));

    const fileUploadClientIdToResourceId = await Promise.all(
      filteredFiles.map(async (filteredFile, index) => {
        await normalAxios.post(endpoints.s3.uploadFile, formDatas[index], {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updateProgress();
        return {
          clientId: filteredFile.clientId,
          resourceId: s3Replies[index].fields.key,
        };
      })
    );

    const returnedObject = fileUploadClientIdToResourceId.reduce(
      (obj, item) => ({
        ...obj,
        [item.clientId]: item.resourceId,
      }),
      {}
    );
    return Promise.resolve(returnedObject);
  }, mutationConfig);
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
    options
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

export const useDeleteBulkUri = (mutationConfig) => {
  const { axios } = useAxios();
  const [store] = useStore();

  return useMutation(async (itemKeys) => {
    const ret = await Promise.all(
      itemKeys.map(async (itemKey) => {
        const { data } = await axios.delete(
          formatString(
            endpoints.s3.deleteUri,
            `${store.profileId}%2F${itemKey}`
          )
        );
        return data;
      })
    );

    return ret;
  }, mutationConfig);
};
