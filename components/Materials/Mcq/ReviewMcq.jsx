import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import Page from 'common/Page/Page';
import { Colors } from 'styles';
import PieChart from 'react-native-pie-chart';
import { TextPropType } from 'proptypes';
import QUESTIONS from './TEMP_DATA';
import getCheeringWords, { wordTypes } from '../_common/getCheeringWords';

const ReviewMcq = ({ route }) => {
  const { storedAnswers } = route.params;
  console.log(storedAnswers);
  const correctCount = storedAnswers.filter((ans) => ans.isCorrect).length;
  const skippedCount = storedAnswers.filter((ans) => ans.isSkipped).length;
  const answersShownCount = storedAnswers.filter(
    (ans) => ans.isAnswerShown
  ).length;
  const incorrectCount =
    storedAnswers.length - correctCount - skippedCount - answersShownCount;

  return (
    <Page>
      <EduText style={styles.header}>
        {correctCount >= incorrectCount + answersShownCount
          ? getCheeringWords(wordTypes.bad)
          : getCheeringWords(wordTypes.bad)}
      </EduText>
      <PieChart
        widthAndHeight={Dimensions.get('window').width * 0.64}
        style={styles.pieChart}
        series={[correctCount, incorrectCount, answersShownCount, skippedCount]}
        sliceColor={[
          Colors.materialGood,
          Colors.materialWrong,
          Colors.accent,
          Colors.materialSkipped,
        ]}
        doughnut
        coverRadius={0.68}
      />
      <View style={styles.legendContainer}>
        <LegendItem
          label="Correct"
          style={styles.correct}
          count={correctCount}
        />
        <LegendItem
          label="Wrong"
          style={styles.incorrect}
          count={incorrectCount}
        />
        <LegendItem
          label="Answers Shown"
          style={styles.answersShown}
          count={answersShownCount}
        />
        <LegendItem
          label="Skipped"
          style={styles.skipped}
          count={skippedCount}
        />
      </View>
    </Page>
  );
};

ReviewMcq.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.exact({
      storedAnswers: PropTypes.arrayOf(
        PropTypes.exact({
          isCorrect: PropTypes.bool.isRequired,
          isSkipped: PropTypes.bool.isRequired,
          isAlreadyAnswered: PropTypes.bool.isRequired,
          isAnswerShown: PropTypes.bool.isRequired,
        })
      ).isRequired,
    }),
  }).isRequired,
};
ReviewMcq.defaultProps = {};

export default ReviewMcq;

const LegendItem = ({ label, count, style }) => (
  <View style={styles.row}>
    <EduText style={[style, styles.legend]}>{label}</EduText>
    <EduText style={[styles.legend]}>{count}</EduText>
  </View>
);

LegendItem.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  style: TextPropType,
};
LegendItem.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    textAlign: 'center',
    margin: Dimensions.get('window').width * 0.05,
    fontSize: 32,
  },
  answersShown: {
    color: Colors.accent,
  },
  incorrect: {
    color: Colors.materialWrong,
  },
  correct: {
    color: Colors.materialGood,
  },
  skipped: {
    color: Colors.materialSkipped,
  },
  legend: {
    fontSize: 28,
    lineHeight: 44,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  legendContainer: {
    flex: 1,
    marginTop: 100,
    margin: Dimensions.get('window').width * 0.12,
  },
  pieChart: {
    alignSelf: 'center',
  },
});
