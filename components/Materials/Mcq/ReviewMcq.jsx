import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import Page from 'common/Page/Page';
import { Colors, Constants } from 'styles';
import PieChart from 'react-native-pie-chart';
import { TextPropType } from 'proptypes';
import { MainActionButton } from 'common/Input/Button';
import { Modal, Portal } from 'react-native-paper';
import QUESTIONS from './TEMP_DATA';
import getCheeringWords, { wordTypes } from '../_common/getCheeringWords';

const ReviewMcq = ({ route }) => {
  const { storedAnswers } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const correctCount = storedAnswers.filter((ans) => ans.isCorrect).length;
  const skippedCount = storedAnswers.filter((ans) => ans.isSkipped).length;
  const answersShownCount = storedAnswers.filter(
    (ans) => ans.isAnswerShown
  ).length;
  const incorrectCount =
    storedAnswers.length - correctCount - skippedCount - answersShownCount;

  const passedExercise = correctCount >= incorrectCount + answersShownCount;

  const [cheeringWord, setCheeringWord] = useState(
    passedExercise
      ? getCheeringWords(wordTypes.bad)
      : getCheeringWords(wordTypes.bad)
  );

  let footerText = '';
  if (correctCount === storedAnswers.length) {
    footerText = 'Wow! That’s perfect!';
  } else if (passedExercise) {
    footerText = 'Don’t stop now, Keep going until you do it perfectly!!';
  } else {
    footerText = 'Take a deep breath and start again.';
  }

  return (
    <Page>
      <Portal>
        <EduText style={styles.header}>{cheeringWord}</EduText>
        <PieChart
          widthAndHeight={Dimensions.get('window').width * 0.64}
          style={styles.pieChart}
          series={[
            correctCount,
            incorrectCount,
            answersShownCount,
            skippedCount,
          ]}
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
        <View style={styles.footer}>
          <EduText style={styles.footerText}>{footerText}</EduText>
          <MainActionButton
            text="Go again ?"
            onPress={() => setIsModalVisible(true)}
          />
        </View>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          contentContainerStyle={styles.modalWrapper}
          style={styles.modal}
        >
          <View style={styles.modalItemsContainer}>
            <EduText style={styles.modalTitle}>What Should we include?</EduText>
            <View style={styles.optionsWrapper}>
              <EduText style={styles.reviewOption}>option I</EduText>
              <EduText style={styles.reviewOption}>option II</EduText>
              <EduText style={styles.reviewOption}>option III</EduText>
              <EduText style={styles.reviewOption}>option IV</EduText>
            </View>
            <MainActionButton
              style={styles.startButton}
              text="Start"
              onPress={() => {}}
            />
          </View>
        </Modal>
      </Portal>
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
    marginTop: Constants.commonMargin * 2,
    margin: Constants.commonMargin,
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
    marginTop: Constants.commonMargin,
    marginHorizontal: Dimensions.get('window').width * 0.12,
  },
  pieChart: {
    alignSelf: 'center',
  },
  footer: {
    marginTop: 'auto',
    margin: Constants.commonMargin,
  },
  footerText: {
    marginBottom: Constants.commonMargin / 2,
    fontSize: 20,
    textAlign: 'center',
  },
  modalTitle: {
    // marginTop: Constants.commonMargin / 2,
    fontSize: 28,
    textAlign: 'center',
  },
  modalItemsContainer: {
    backgroundColor: Colors.foreground,
    // height: Dimensions.get('window').height * 0.37,
    width: '100%',
    padding: Constants.commonMargin / 2,
    paddingTop: Constants.commonMargin,
  },
  modal: {
    justifyContent: 'flex-end',
  },
  reviewOption: {
    fontSize: 20,
    paddingVertical: Constants.commonMargin / 3,
    paddingHorizontal: Constants.commonMargin,
  },
  startButton: {
    marginTop: (Constants.commonMargin * 2) / 3,
  },
});
