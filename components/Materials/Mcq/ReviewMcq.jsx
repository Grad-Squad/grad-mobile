import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import Page from 'common/Page/Page';
import { Colors, Constants } from 'styles';
import PieChart from 'react-native-pie-chart';
import { navigationPropType, TextPropType } from 'proptypes';
import { MainActionButton } from 'common/Input/Button';
import { Portal } from 'react-native-paper';
import { useLocalization } from 'localization';
import MaterialViewHeader from 'common/MaterialHeader/MaterialViewHeader';
import ScreenNames from 'navigation/ScreenNames';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenMaterialData } from 'globalStore/materialNavSlice';
import getCheeringWords, { wordTypes } from '../_common/getCheeringWords';
import ReviewMcqModal from './ReviewMcqModal';

const ReviewMcq = ({ navigation }) => {
  const { t } = useLocalization();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { data: storedAnswers, title } = useSelector(
    (state) => state.material.openMaterialData
  );
  const materialOwner = useSelector((state) => state.material.materialOwner);

  const correctCount = storedAnswers.filter((ans) => ans.isCorrect).length;
  const skippedCount = storedAnswers.filter((ans) => ans.isSkipped).length;
  const answersShownCount = storedAnswers.filter(
    (ans) => ans.isAnswerShown
  ).length;
  const incorrectCount =
    storedAnswers.length - correctCount - skippedCount - answersShownCount;

  const passedExercise = correctCount >= incorrectCount + answersShownCount;

  const [cheeringWord] = useState(
    passedExercise
      ? getCheeringWords(wordTypes.good, t)
      : getCheeringWords(wordTypes.bad, t)
  );

  let footerText = '';
  if (correctCount === storedAnswers.length) {
    footerText = t('McqReview/footerText/Wow! That’s perfect!');
  } else if (passedExercise) {
    footerText = t(
      'McqReview/footerText/Don’t stop now, Keep going until you do it perfectly!!'
    );
  } else {
    footerText = t('McqReview/footerText/Take a deep breath and start again.');
  }

  return (
    <Page>
      <Portal>
        <MaterialViewHeader
          onBackPress={() => navigation.goBack()}
          author={materialOwner?.name}
          title={title}
          contextMenuItems={[
            {
              titleKey: 'ContextMenu/Save',
              onPress: () => Alert.alert('WIP'),
              iconName: 'bookmark',
            },
          ]}
        />
        <ScrollView>
          <EduText style={styles.header}>{cheeringWord}</EduText>
          <PieChart
            widthAndHeight={Dimensions.get('window').width * 0.54}
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
              label={t('McqReview/Correct')}
              style={styles.correct}
              count={correctCount}
            />
            <LegendItem
              label={t('McqReview/Wrong')}
              style={styles.incorrect}
              count={incorrectCount}
            />
            <LegendItem
              label={t('McqReview/AnswersShown')}
              style={styles.answersShown}
              count={answersShownCount}
            />
            <LegendItem
              label={t('McqReview/Skipped')}
              style={styles.skipped}
              count={skippedCount}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <EduText style={styles.footerText}>{footerText}</EduText>
          <MainActionButton
            text={t('McqReview/Again?')}
            onPress={() => setIsModalVisible(true)}
          />
        </View>
        <ReviewMcqModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          isCorrectAllowed={correctCount > 0}
          isWrongAllowed={incorrectCount > 0}
          isSkippedAllowed={skippedCount > 0}
          isShownAllowed={answersShownCount > 0}
          onFinish={(isCorrect, isWrong, isAnswerShown, isSkipped) => {
            dispatch(
              setOpenMaterialData({
                title,
                data: storedAnswers.filter(
                  (ans) =>
                    (ans.isCorrect && isCorrect) ||
                    (!ans.isCorrect && ans.isAlreadyAnswered && isWrong) ||
                    (ans.isAnswerShown && isAnswerShown) ||
                    (ans.isSkipped && isSkipped)
                ),
              })
            );
            navigation.replace(ScreenNames.SOLVE_MCQ);
          }}
        />
      </Portal>
    </Page>
  );
};

ReviewMcq.propTypes = {
  navigation: navigationPropType.isRequired,
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
    paddingTop: 5,
  },
  footerText: {
    marginBottom: Constants.commonMargin / 2,
    fontSize: 20,
    textAlign: 'center',
  },
});
