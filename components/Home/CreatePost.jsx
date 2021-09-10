import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';

const CreatePost = () => {
  return (
    <View>
      <EduText style={{ fontSize: 100 }}>Create Post</EduText>
    </View>
  );
};

CreatePost.propTypes = {};
CreatePost.defaultProps = {};

export default CreatePost;

const styles = StyleSheet.create({});
