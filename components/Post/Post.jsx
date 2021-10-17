import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

import TitleRegion from './TitleRegion/TitleRegion';
import FooterRegion from './FooterRegion';

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 5,
    width: '100%',
  },
});

function Post({ title, author, rating, createdAt, id }) {
  return (
    <View style={styles.container}>
      <ThemeProvider>
        <TitleRegion
          title={title}
          profileName={author.name}
          createdAt={createdAt}
        />
        <FooterRegion
          style={styles.container}
          rating={{
            entityId: id,
            ...rating,
          }}
          commentCount={666}
          isPost
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
};
