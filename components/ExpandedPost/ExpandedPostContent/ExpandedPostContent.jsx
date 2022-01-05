import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import EduText from 'common/EduText';
import LoadingIndicator from 'common/LoadingIndicator';
import {
  apiFeedQueryKey,
  useAPIDeletePost,
  useAPIGetPostById,
} from 'api/endpoints/posts';
import { useLocalization } from 'localization';
import PostContentList from 'common/Post/PostContentList';
import { formatDate } from 'utility';
import GoBackButton from 'common/GoBackButton';
import { navigationPropType } from 'proptypes';
import FooterRegion from 'components/Post/FooterRegion';
import PostDeletionAlert from 'components/Post/PostDeletionAlert';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';
import ScreenNames from 'navigation/ScreenNames';
import { useDispatch } from 'react-redux';
import { setMaterialOwner } from 'globalStore/materialNavSlice';

import AuthorInfo from './AuthorInfo';
import ExpandedPostContentSkeleton from './ExpandedPostContentSkeleton';
import styles from './ExpandedPostContentStyles';
import NoInternetConnectionText from 'common/NoInternetConnectionText';

const ExpandedPostContent = ({ navigation, postId }) => {
  const { t } = useLocalization();
  const { data: post, isLoading, isError } = useAPIGetPostById(postId);
  const deletePostMutation = useAPIDeletePost(postId, {
    onSuccess: () => {
      // ? success message
      queryClient.invalidateQueries(apiFeedQueryKey);
      navigation.navigate(ScreenNames.HOME);
    },
  });
  const upvotePercentage = useMemo(
    () =>
      post && post.rating.upvotes + post.rating.downvotes > 0
        ? (post.rating.upvotes * 100) /
          (post.rating.upvotes + post.rating.downvotes)
        : 0,
    [post]
  );

  const dispatch = useDispatch();
  dispatch(setMaterialOwner(post?.author));

  if (isLoading) {
    return <ExpandedPostContentSkeleton navigation={navigation} />;
  }

  return (
    <>
      <View style={styles.outerContainer}>
        <GoBackButton
          onPress={() => navigation.goBack()}
          otherComponent={
            post && <EduText style={styles.header}>{post.title}</EduText>
          }
        />
        <NoInternetConnectionText />
        {isLoading && <LoadingIndicator large />}
        {isError && (
          <EduText style={styles.couldNotGetPostError}>
            {t("ExpandedPost/Post/Error: Couldn't get post")}
          </EduText>
        )}
        {post && (
          <>
            <View style={styles.innerContainer}>
              <AuthorInfo
                profilePicture={post.author.profilePicture}
                name={post.author.name}
                profileId={post.author.id}
              />
              <View style={styles.contentContainer}>
                <PostContentList materials={post.materials} />
              </View>
            </View>

            <View style={styles.extraInfo}>
              <EduText style={styles.extraInfoText}>
                {formatDate(post.createdAt)}
              </EduText>
              <EduText style={styles.extraInfoText}>
                {`${upvotePercentage}% ${t('ExpandedPost/upvoted')}`}
              </EduText>
              <EduText style={styles.extraInfoText}>
                {post.subject.content}
              </EduText>
            </View>
          </>
        )}
      </View>
      {post && (
        <FooterRegion
          style={styles.footerContainer}
          rating={post.rating}
          postId={postId}
          commentCount={post.commentCount}
          isPost
          onEdit={() =>
            navigation.navigate(ScreenNames.CREATE_POST, {
              edit: true,
              postId,
            })
          }
          onDelete={() => {
            PostDeletionAlert(t, () => deletePostMutation.mutate());
          }}
          contentProfileId={post.author.id}
        />
      )}
    </>
  );
};

ExpandedPostContent.propTypes = {
  navigation: navigationPropType.isRequired,
  postId: PropTypes.number.isRequired,
};
ExpandedPostContent.defaultProps = {};

export default ExpandedPostContent;
