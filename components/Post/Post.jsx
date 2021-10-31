import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { StyleSheet, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { materialsPropType, ratingPropType, stylePropType } from 'proptypes';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import ScreenNames from 'navigation/ScreenNames';
import TitleRegion from './TitleRegion/TitleRegion';
import FooterRegion from './FooterRegion';

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
}) {
  const navigation = useNavigation();
  const onEdit = () => {
    navigation.navigate(ScreenNames.CREATE_POST, {
      edit: true,
      postId: id,
    });
  };
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => navigation.navigate(ScreenNames.POST, { postID: id })}
    >
      <ThemeProvider>
        <TitleRegion
          title={title}
          profileName={author.name}
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
    profilePicture: PropTypes.string.isRequired,
  }).isRequired,
  style: stylePropType,
  commentCount: PropTypes.number.isRequired,
  materials: materialsPropType.isRequired,
};
Post.defaultProps = {
  style: {},
};
