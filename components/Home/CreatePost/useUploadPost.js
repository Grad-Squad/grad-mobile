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
  resetUploadState,
} from 'globalStore/createPostSlice';
import ScreenNames from 'navigation/ScreenNames';
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
        navigation.replace(ScreenNames.POST, { postID: postId });
      } else {
        navigation.replace(ScreenNames.POST, {
          postID: createPostMutation.data.id,
        });
      }
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

  const fileUploads = useSelector((state) => state.createPost.fileUploads);
  const [imagesProgress, setImagesProgress] = useState(0);
  const [imagesClientIdToResourceId, setImagesClientIdToResourceId] = useState(
    {}
  );
  const [docsClientIdToResourceId, setDocsClientIdToResourceId] = useState({});
  const [videosClientIdToResourceId, setVideosClientIdToResourceId] = useState(
    {}
  );
  const incrementProgress = () => setImagesProgress((prev) => prev + 1);

  const bulkUploadImagesMutation = useAPIBulkUploadFiles(incrementProgress, {
    onSuccess: (mapping) => setImagesClientIdToResourceId(mapping),
  });
  const bulkUploadDocsMutation = useAPIBulkUploadFiles(incrementProgress, {
    onSuccess: (mapping) => setDocsClientIdToResourceId(mapping),
  });
  const bulkUploadVideosMutation = useAPIBulkUploadFiles(incrementProgress, {
    onSuccess: (mapping) => setVideosClientIdToResourceId(mapping),
  });
  const [numImageLinks, setNumImageLinks] = useState(0);
  const [isS3Error, setIsS3Error] = useState(false);
  const resetErrors = () => setIsS3Error(false);

  // todo batches (ex: user uploading 200 pic might timeout due to upload time limit)
  const getS3ImageLinks = useAPIgetS3UploadImageLinks(numImageLinks, {
    enabled: numImageLinks !== 0,
    onSuccess: (data) => {
      bulkUploadImagesMutation.mutate({
        s3Replies: data,
        fileType: fileUploadTypes.IMAGE,
      });
    },
    onError: () => setIsS3Error(true),
  });

  const [numPdfLinks, setNumPdfLinks] = useState(0);
  const getS3PdfLinks = useAPIgetS3UploadDocLinks(numPdfLinks, {
    enabled: numPdfLinks !== 0,
    onSuccess: (data) => {
      bulkUploadDocsMutation.mutate({
        s3Replies: data,
        fileType: fileUploadTypes.DOC,
      });
    },
    onError: () => setIsS3Error(true),
  });

  const [numVideoLinks, setNumVideoLinks] = useState(0);
  const getS3VideoLinks = useAPIgetS3UploadVideoLinks(numVideoLinks, {
    enabled: numVideoLinks !== 0,
    onSuccess: (data) => {
      bulkUploadVideosMutation.mutate({
        s3Replies: data,
        fileType: fileUploadTypes.VIDEO,
      });
    },
    onError: () => setIsS3Error(true),
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

  useEffect(() => {
    if (
      !areFileUploadsReady &&
      !isPostReadyForUpload &&
      fileUploads.length !== 0 &&
      (bulkUploadImagesMutation.isSuccess || numImageLinks === 0) &&
      (bulkUploadDocsMutation.isSuccess || numPdfLinks === 0) &&
      (bulkUploadVideosMutation.isSuccess || numVideoLinks === 0)
    ) {
      dispatch(
        parsePost({
          data: formik.values,
          fileUploadClientIdToResourceId: {
            ...imagesClientIdToResourceId,
            ...docsClientIdToResourceId,
            ...videosClientIdToResourceId,
          },
        })
      );
    }
  });

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

  // const isUploadingImages =
  //   fileUploads.length !== 0 &&
  //   imagesProgress !== numImageLinks + numPdfLinks + numVideoLinks;

  // const isBulkUploadFilesLoading =
  //   bulkUploadImagesMutation.isLoading ||
  //   bulkUploadDocsMutation.isLoading ||
  //   bulkUploadVideosMutation.isLoading;

  const isBulkUploadFilesError =
    bulkUploadImagesMutation.isError ||
    bulkUploadDocsMutation.isError ||
    bulkUploadVideosMutation.isError;

  // const isUploadingPost =
  //   (isUploadingImages ||
  //     createPostMutation.isLoading ||
  //     isBulkUploadFilesLoading) &&
  //   !isBulkUploadFilesError;

  const isUploadError =
    getS3ImageLinks.isError ||
    createPostMutation.isError ||
    isBulkUploadFilesError ||
    updatePostMutation.isError ||
    isS3Error;

  useEffect(() => {
    if (isUploadError) {
      dispatch(resetUploadState());
    }
  }, [dispatch, isUploadError]);

  return {
    totalFilesToUpload: numImageLinks + numPdfLinks + numVideoLinks,
    imagesProgress,
    isUploadError,
    resetErrors,
    // isUploadingPost,
  };
};

export default useUploadPost;
