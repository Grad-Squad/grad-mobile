import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import LoadingIndicator from 'common/LoadingIndicator';
import { useAPIGetPostById } from 'api/endpoints/posts';
import { useLocalization } from 'localization';
import { Colors, Constants, Styles } from 'styles';
import PostContentList from 'common/Post/PostContentList';
import { formatDate } from 'utility';
import GoBackButton from 'common/GoBackButton';
import { navigationPropType } from 'proptypes';
import FooterRegion from 'components/Post/FooterRegion';
import AuthorInfo from './AuthorInfo';

const ExpandedPostContent = ({ navigation, postId }) => {
  const { t } = useLocalization();
  const { data: post, isLoading, isError } = useAPIGetPostById(postId);

  const upvotePercentage = useMemo(
    () =>
      post && post.rating.upvotes + post.rating.downvotes > 0
        ? (post.rating.upvotes * 100) /
          (post.rating.upvotes + post.rating.downvotes)
        : 0,
    [post]
  );

  return (
    <>
      <View style={styles.outerContainer}>
        <GoBackButton onPress={() => navigation.goBack()} />
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
                <EduText style={styles.postTitle}>{post.title}</EduText>
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
              <EduText style={styles.extraInfoText}>{post.subject}</EduText>
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
          onEdit={() => {}}
          contentProfileId={-1}
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

const styles = StyleSheet.create({
  couldNotGetPostError: {
    ...Styles.errorText,
    textAlign: 'center',
    fontSize: 30,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  postTitle: {
    fontSize: 22,
  },
  outerContainer: {
    ...Styles.dropShadow,
    borderColor: Colors.border,
    backgroundColor: Colors.cardBody,
    paddingHorizontal: 15,
    paddingBottom: 5,

    paddingTop: 1 * Constants.fromScreenStartPadding + 10,

    minHeight: 225,
  },
  innerContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  extraInfo: {
    marginLeft: 'auto',
  },
  extraInfoText: {
    fontSize: 9.5,
    textAlign: 'right',
  },
  footerContainer: {
    alignSelf: 'center',
    width: '90%',
  },
});
