import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';

const Search = () => {
  return (
    <View>
      <EduText style={{ fontSize: 100 }}>Search</EduText>
    </View>
  );
};

Search.propTypes = {};
Search.defaultProps = {};

export default Search;

const styles = StyleSheet.create({});
