import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';

const Bookmarks = () => {
  return (
    <View>
      <EduText style={{ fontSize: 100 }}>Bookmarks</EduText>
    </View>
  );
};

Bookmarks.propTypes = {};
Bookmarks.defaultProps = {};

export default Bookmarks;

const styles = StyleSheet.create({});
