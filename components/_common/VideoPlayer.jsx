import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const VideoPlayer = ({ uri }) => (
  <Video
    style={{
      alignSelf: 'center',
      width: '100%',
      height: 200,
    }}
    source={{
      uri,
    }}
    useNativeControls
    resizeMode="contain"
  />
);

VideoPlayer.propTypes = {
  uri: PropTypes.string.isRequired,
};
VideoPlayer.defaultProps = {};

export default VideoPlayer;

const styles = StyleSheet.create({});
