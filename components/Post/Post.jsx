import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

import { stylePropType } from 'proptypes';
import { useNavigation } from '@react-navigation/core';
import ScreenNames from 'navigation/ScreenNames';
import TitleRegion from './TitleRegion/TitleRegion';
import FooterRegion from './FooterRegion';

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 5,
    width: '100%',
  },
});

function Post({ title, author, rating, createdAt, id, style }) {
  const navigation = useNavigation();
  const onEdit = () => {
    navigation.navigate(ScreenNames.CREATE_POST, {
      edit: true,
      postId: id,
    });
  };
  return (
    <View style={[styles.container, style]}>
      <ThemeProvider>
        <TitleRegion
          title={title}
          profileName={author.name}
          createdAt={createdAt}
        />
        <FooterRegion
          contentProfileId={author.id}
          style={styles.container}
          rating={{
            entityId: id,
            ...rating,
          }}
          commentCount={666}
          isPost
          onEdit={onEdit}
        />
      </ThemeProvider>
    </View>
  );
}

export default Post; // todo memo

Post.propTypes = {
  id: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.exact({
    id: PropTypes.number.isRequired,
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired,
  }).isRequired,
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
  }).isRequired,
  style: stylePropType,
};
Post.defaultProps = {
  style: {},
};
