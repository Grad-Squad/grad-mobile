import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import Page from 'common/Page/Page';
import QUESTIONS from './TEMP_DATA';

const ReviewMcq = ({ route }) => {
  const { storedAnswers } = route.params;
  console.log(storedAnswers);
  const correctCount = storedAnswers.filter((ans) => ans.isCorrect).length;
  const skippedCount = storedAnswers.filter((ans) => ans.isSkipped).length;
  const incorrectCount = storedAnswers.length - correctCount - skippedCount;

  return (
    <Page>
      <View style={styles.legend}>
        <EduText style={{ color: 'black' }}>Correct: {correctCount}</EduText>
        <EduText>Skipped: {skippedCount}</EduText>
        <EduText>Incorrect: {incorrectCount}</EduText>
      </View>
    </Page>
  );
};

ReviewMcq.propTypes = {};
ReviewMcq.defaultProps = {};

export default ReviewMcq;

const styles = StyleSheet.create({
  legend: {
    // backgroundColor: 'red',
    // flex: 1,
    // padding: Dimensions.get('window').width * 0.8,
  },
});
