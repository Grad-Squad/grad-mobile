import {
  apiFeedQueryKey,
  getPostByIdQueryKey,
  useAPICreatePost,
  useAPIUpdatePost,
} from 'api/endpoints/posts';
import {
  useAPIBulkUploadFiles,
  useAPIgetS3UploadDocLinks,
  useAPIgetS3UploadImageLinks,
  useAPIgetS3UploadVideoLinks,
  useDeleteBulkUri,
} from 'api/endpoints/s3';
import fileUploadTypes from 'constants/fileUploadTypes';
import {
  clearCreatePost,
  parsePost,
  resetAreFileUploadsReady,
} from 'globalStore/createPostSlice';
import useOnGoBackDiscardWarning from 'navigation/useOnGoBackDiscardWarning';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

const useUploadPost = (
  formik,
  postId,
  refetchPost,
  navigation,
  fetchedPostData
) => {
  const dispatch = useDispatch();
  const createPostMutation = useAPICreatePost({});
  const updatePostMutation = useAPIUpdatePost(postId, {
    onSubmit: () => refetchPost(),
  });

  const bulkUriDeleteMutation = useDeleteBulkUri();
  const deletedUris = useSelector((state) => state.createPost.deletedUris);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (createPostMutation.isSuccess || updatePostMutation.isSuccess) {
      dispatch(clearCreatePost());
      bulkUriDeleteMutation.mutate(deletedUris);
      queryClient.invalidateQueries(apiFeedQueryKey);
      if (postId) {
        queryClient.invalidateQueries(getPostByIdQueryKey(postId));
      }
      navigation.goBack();
    }
  }, [
    navigation,
    updatePostMutation.isSuccess,
    createPostMutation.isSuccess,
    dispatch,
    bulkUriDeleteMutation,
    deletedUris,
    queryClient,
    postId,
  ]);

  const [imagesProgress, setImagesProgress] = useState(0);
  const bulkUploadFilesMutation = useAPIBulkUploadFiles(
    () => {
      setImagesProgress((prev) => prev + 1);
    },
    {
      onSuccess: (fileUploadClientIdToResourceId) => {
        dispatch(
          parsePost({ data: formik.values, fileUploadClientIdToResourceId })
        );
      },
    }
  );
  const fileUploads = useSelector((state) => state.createPost.fileUploads);
  const [numImageLinks, setNumImageLinks] = useState(0);

  // todo batches (ex: user uploading 200 pic might timeout due to upload time limit)
  const getS3ImageLinks = useAPIgetS3UploadImageLinks(numImageLinks, {
    enabled: numImageLinks !== 0,
    onSuccess: (data) => {
      bulkUploadFilesMutation.mutate({
        s3Replies: data,
        fileType: fileUploadTypes.IMAGE,
      });
    },
    onError: () => {},
  });

  const [numPdfLinks, setNumPdfLinks] = useState(0);
  const getS3PdfLinks = useAPIgetS3UploadDocLinks(numPdfLinks, {
    enabled: numPdfLinks !== 0,
    onSuccess: (data) => {
      bulkUploadFilesMutation.mutate({
        s3Replies: data,
        fileType: fileUploadTypes.DOC,
      });
    },
    onError: () => {},
  });

  const [numVideoLinks, setNumVideoLinks] = useState(0);
  const getS3VideoLinks = useAPIgetS3UploadVideoLinks(numVideoLinks, {
    enabled: numVideoLinks !== 0,
    onSuccess: (data) => {
      bulkUploadFilesMutation.mutate({
        s3Replies: data,
        fileType: fileUploadTypes.VIDEO,
      });
    },
    onError: () => {},
  });

  const areFileUploadsReady = useSelector(
    (state) => state.createPost.areFileUploadsReady
  );

  useEffect(() => {
    if (areFileUploadsReady) {
      dispatch(resetAreFileUploadsReady());
      if (fileUploads.length !== 0) {
        setNumImageLinks(
          fileUploads.filter((file) => file.fileType === fileUploadTypes.IMAGE)
            .length
        );
        if (getS3ImageLinks.isError) {
          getS3ImageLinks.refetch();
        }
        setNumPdfLinks(
          fileUploads.filter((file) => file.fileType === fileUploadTypes.DOC)
            .length
        );
        if (getS3PdfLinks.isError) {
          getS3PdfLinks.refetch();
        }
        setNumVideoLinks(
          fileUploads.filter((file) => file.fileType === fileUploadTypes.VIDEO)
            .length
        );
        if (getS3VideoLinks.isError) {
          getS3VideoLinks.refetch();
        }
        // todo add other upload types
      } else {
        dispatch(parsePost({ data: formik.values }, {}));
      }
    }
  }, [fileUploads, areFileUploadsReady, dispatch, resetAreFileUploadsReady]);

  const isPostReadyForUpload = useSelector(
    (state) => state.createPost.isPostReadyForUpload
  );

  const parsedPost = useSelector((state) => state.createPost.post);

  useEffect(() => {
    if (isPostReadyForUpload) {
      if (postId) {
        updatePostMutation.mutate({
          ...fetchedPostData,
          ...parsedPost,
        });
      } else {
        createPostMutation.mutate(parsedPost);
      }
    }
  }, [isPostReadyForUpload, parsedPost, fetchedPostData, postId]);

  useOnGoBackDiscardWarning(
    !formik.dirty ||
      updatePostMutation.isSuccess ||
      createPostMutation.isSuccess,
    [formik.dirty, updatePostMutation.isSuccess, createPostMutation.isSuccess],
    () => dispatch(clearCreatePost())
  );

  const isUploadingImages =
    fileUploads.length !== 0 &&
    imagesProgress !== numImageLinks + numPdfLinks + numVideoLinks;

  const isUploadingPost =
    (isUploadingImages ||
      createPostMutation.isLoading ||
      bulkUploadFilesMutation.isLoading) &&
    !bulkUploadFilesMutation.isError;

  const isUploadError =
    getS3ImageLinks.isError ||
    createPostMutation.isError ||
    bulkUploadFilesMutation.isError ||
    updatePostMutation.isError;

  return {
    totalFilesToUpload: numImageLinks + numPdfLinks + numVideoLinks,
    imagesProgress,
    isUploadError,
    isUploadingPost,
  };
};

export default useUploadPost;
