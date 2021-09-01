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
    width: '86%',
  },
});

// const DATE = new Date();

function Post({ postData }) {
  const { title, author, rating, priceInCents, createdAt, id } = postData;
  const creationDate = new Date(createdAt);

  return (
    <View style={styles.container}>
      <ThemeProvider>
        <TitleRegion
          title={title}
          profileName={author.name}
          postDate={creationDate}
        />
        <FooterRegion
          style={styles.container}
          rating={{
            entityId: id,
            ...rating,
          }}
          commentCount={priceInCents}
          isPost
        />
      </ThemeProvider>
    </View>
  );
}

export default Post;

Post.propTypes = {
  postData: PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    priceInCents: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    rating: PropTypes.exact({
      id: PropTypes.number.isRequired,
      upvotes: PropTypes.number.isRequired,
      downvotes: PropTypes.number.isRequired,
      currentUserStatus: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
