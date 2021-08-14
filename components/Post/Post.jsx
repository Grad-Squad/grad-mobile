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

const DATE = new Date();

function Post({ title, user }) {
  return (
    <View style={styles.container}>
      <ThemeProvider>
        <TitleRegion title={title} profileName={user} postDate={DATE} />
        <FooterRegion style={styles.container} votes={123469} commentsCount={4120} />
      </ThemeProvider>
    </View>
  );
}

export default Post;

Post.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};
