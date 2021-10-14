import Page from 'common/Page/Page';
import { navigationPropType } from 'proptypes';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Constants, Colors } from 'styles';
import { ProgressBar } from 'react-native-paper';
import MaterialViewHeader from 'common/MaterialHeader/MaterialViewHeader';
import { useStore } from 'globalstore/GlobalStore';
import ReducerActions from 'globalstore/ReducerActions';
import ScreenNames from 'navigation/ScreenNames';
import NavMaterials from '../_common/NavMaterials';
import McqQuestion from './McqQuestion';
import QUESTIONS from './TEMP_DATA';

const initialQuestionState = {
  isCorrect: false,
  isSkipped: false,
  isAnswerShown: false,
  isAlreadyAnswered: false,
};

const SolveMcq = ({ navigation, route }) => {
  const { materialID } = route.params || {};

  const [state, dispatch] = useStore();

  const rawQuestions = materialID ? QUESTIONS : state.material.mcqQuestions;
  const [questions, setQuestions] = useState(() =>
    rawQuestions.map((question) => ({
      ...question,
      ...initialQuestionState,
    }))
  );

  const [pageNum, setPageNum] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);

  const decrementPage = () => setPageNum((prev) => Math.max(prev - 1, 0));
  const incrementPage = () => {
    // by default set skipped to true ?
    setPageNum((prev) => Math.min(prev + 1, questions.length - 1));
    if (pageNum === questions.length - 1) {
      setHasFinished(true);
    }
  };

  useEffect(() => {
    if (hasFinished) {
      dispatch({ type: ReducerActions.setMCQQuestions, payload: questions });
      navigation.navigate(ScreenNames.REVIEW_MCQ);
    }
  }, [hasFinished]);

  const handleAnswerShown = () => {
    setQuestions((prev) => {
      const newStoredAnswers = [...prev];
      newStoredAnswers[pageNum] = {
        ...newStoredAnswers[pageNum],
        ...initialQuestionState,
        isAnswerShown: true,
        isAlreadyAnswered: true,
      };
      return newStoredAnswers;
    });
    incrementPage();
  };

  const handleAnswer = (asnweredCorrectly) => {
    setQuestions((prev) => {
      const newStoredAnswers = [...prev];
      newStoredAnswers[pageNum] = {
        ...newStoredAnswers[pageNum],
        ...initialQuestionState,
        isCorrect: asnweredCorrectly,
        isAlreadyAnswered: true,
      };
      return newStoredAnswers;
    });
    incrementPage();
  };

  const handleSkip = () => {
    setQuestions((prev) => {
      const newStoredAnswers = [...prev];
      newStoredAnswers[pageNum] = {
        ...newStoredAnswers[pageNum],
        ...initialQuestionState,
        isSkipped: true,
      };
      return newStoredAnswers;
    });
    incrementPage();
  };

  return (
    <Page>
      <MaterialViewHeader
        onBackPress={() => {}}
        author="Ramez"
        title="When the potato took over"
        contextMenuItems={[
          {
            titleKey: 'ContextMenu/Save',
            onPress: () => Alert.alert('WIP'),
            iconName: 'bookmark',
          },
        ]}
      />
      <ProgressBar
        progress={(pageNum + 1) / questions.length}
        color={Colors.accent}
      />
      <View style={styles.navMaterials}>
        <NavMaterials
          onPressNext={incrementPage}
          onPressBack={decrementPage}
          onPressPageNum={(num) => setPageNum(num)}
          currentPageIndex={pageNum}
          maxPages={questions.length}
        />
      </View>
      <McqQuestion
        question={questions[pageNum]}
        questionIndex={pageNum}
        isAlreadyAnswered={questions[pageNum].isAlreadyAnswered}
        isLastQuestion={pageNum === questions.length - 1}
        handleAnswerShown={handleAnswerShown}
        handleAnswer={handleAnswer}
        handleSkip={handleSkip}
      />
    </Page>
  );
};

SolveMcq.propTypes = {
  navigation: navigationPropType.isRequired,
  route: PropTypes.shape({
    params: PropTypes.exact({
      materialID: PropTypes.string,
    }),
  }).isRequired,
};
SolveMcq.defaultProps = {};

export default SolveMcq;

const styles = StyleSheet.create({
  navMaterials: {
    paddingHorizontal: Constants.commonMargin,
    paddingVertical: Constants.commonMargin / 2,
    alignSelf: 'flex-end',
  },
});
