import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Page from 'common/Page/Page';
import { navigationPropType } from 'proptypes';
import CreatePostHeader from './CreatePostHeader';

const CreatePost = ({ navigation }) => (
  <Page>
    <CreatePostHeader
      onBackPress={() => navigation.goBack()}
      onPostPress={() => Alert.alert('post')}
    />
  </Page>
);

CreatePost.propTypes = { navigation: navigationPropType.isRequired };
CreatePost.defaultProps = {};

export default CreatePost;

const styles = StyleSheet.create({});
