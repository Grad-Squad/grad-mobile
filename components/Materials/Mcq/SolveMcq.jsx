import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { Constants } from 'styles';

const SolveMcq = () => {
  const [pageNum, setPageNum] = useState(5);
  const maxPages = 10;
  const incrementPage = () =>
    setPageNum((state) => Math.min(state + 1, maxPages - 1));
  const decrementPage = () => setPageNum((state) => Math.max(state - 1, 0));
  return (
    <View style={styles.container}>
      <Text>testtttt</Text>
      <Text>testtttt</Text>
      <Text>testtttt</Text>
    </View>
  );
};

SolveMcq.propTypes = {};
SolveMcq.defaultProps = {};

export default SolveMcq;

const styles = StyleSheet.create({
  container: {
    padding: Constants.commonMargin,
    backgroundColor: '#FBFBFB',
    flex: 1,
  },
});
