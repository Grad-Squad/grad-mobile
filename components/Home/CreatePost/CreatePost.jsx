import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { navigationPropType } from 'proptypes';
import CreatePostHeader from './CreatePostHeader';
import AddMaterialList from './AddMaterialList';

const CreatePost = ({ navigation }) => (
  <Page>
    <CreatePostHeader
      onBackPress={() => navigation.goBack()}
      onPostPress={() => Alert.alert('post')}
    />
    <AddMaterialList navigation={navigation}/>
  </Page>
);

CreatePost.propTypes = { navigation: navigationPropType.isRequired };
CreatePost.defaultProps = {};

export default CreatePost;

const styles = StyleSheet.create({});
