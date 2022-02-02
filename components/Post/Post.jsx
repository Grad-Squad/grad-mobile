import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { StyleSheet, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { materialsPropType, ratingPropType, stylePropType, uriPropType } from 'proptypes';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import ScreenNames from 'navigation/ScreenNames';
import { useLocalization } from 'localization';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';
import { apiFeedQueryKey, useAPIDeletePost } from 'api/endpoints/posts';
import TitleRegion from './TitleRegion/TitleRegion';
import FooterRegion from './FooterRegion';
import PostDeletionAlert from './PostDeletionAlert';

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    width: '100%',
  },
  footerRegion: {
    width: '90%',
    alignSelf: 'center',
  },
});

function Post({
  title,
  author,
  rating,
  createdAt,
  id,
  style,
  commentCount,
  materials,
  bookmarkId,
  inRootBookmark,
  disabled,
}) {
  const { t } = useLocalization();
  const navigation = useNavigation();
  const deletePostMutation = useAPIDeletePost(id, {
    onSuccess: () => {
      // ? deleted successfully message
      queryClient.invalidateQueries(apiFeedQueryKey);
    },
  });
  const onEdit = () => {
    navigation.navigate(ScreenNames.CREATE_POST, {
      edit: true,
      postId: id,
    });
  };
  const onDelete = () => {
    PostDeletionAlert(t, () => deletePostMutation.mutate());
  };
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => navigation.navigate(ScreenNames.POST, { postID: id })}
      disabled={disabled}
      pointerEvents={disabled ? 'none' : undefined}
    >
      <ThemeProvider>
        <TitleRegion
          title={title}
          author={author}
          profileId={author.id}
          createdAt={createdAt}
          materials={materials}
        />
        <FooterRegion
          contentProfileId={author.id}
          style={styles.footerRegion}
          rating={rating}
          postId={id}
          commentCount={commentCount}
          isPost
          onEdit={onEdit}
          onDelete={onDelete}
          bookmarkId={bookmarkId}
          inRootBookmark={inRootBookmark}
        />
      </ThemeProvider>
    </Pressable>
  );
}

export default React.memo(Post);

Post.propTypes = {
  id: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: ratingPropType.isRequired,
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profilePicture: uriPropType,
  }).isRequired,
  style: stylePropType,
  commentCount: PropTypes.number.isRequired,
  materials: materialsPropType.isRequired,
  bookmarkId: PropTypes.number,
  inRootBookmark: PropTypes.bool,
  disabled: PropTypes.bool,
};
Post.defaultProps = {
  style: {},
  bookmarkId: undefined,
  inRootBookmark: undefined,
  disabled: false,
};
