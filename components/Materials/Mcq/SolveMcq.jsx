import Page from 'common/Page/Page';
import { navigationPropType } from 'proptypes';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Constants, Colors } from 'styles';
import { ProgressBar } from 'react-native-paper';
import MaterialViewHeader from 'common/MaterialHeader/MaterialViewHeader';
import { useStore } from 'globalStore/GlobalStore';
import ReducerActions from 'globalStore/ReducerActions';
import ScreenNames from 'navigation/ScreenNames';
import useOnGoBack from 'navigation/useOnGoBack';
import LoseProgressAlert from 'common/alerts/LoseProgressAlert';
import { useLocalization } from 'localization';
import NavMaterials from '../_common/NavMaterials';
import McqQuestion from './McqQuestion';
import QUESTIONS from './TEMP_DATA';

const initialQuestionState = {
  isCorrect: false,
  isSkipped: false,
  isAnswerShown: false,
  isAlreadyAnswered: false,
  chosenIndices: [],
};

const SolveMcq = ({ navigation, route }) => {
  const { t } = useLocalization();
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
  const [dirty, setDirty] = useState(false);

  const decrementPage = () => setPageNum((prev) => Math.max(prev - 1, 0));
  const setCurrentQuestionToSkipped = () => {
    setQuestions((prev) => {
      const newStoredAnswers = [...prev];
      newStoredAnswers[pageNum] = {
        ...newStoredAnswers[pageNum],
        ...initialQuestionState,
        isSkipped: true,
      };
      return newStoredAnswers;
    });
  };
  const incrementPage = () => {
    const { isAlreadyAnswered, isAnswerShown } = questions[pageNum];
    if (!(isAnswerShown || isAlreadyAnswered)) {
      setCurrentQuestionToSkipped();
    }
    setPageNum((prev) => Math.min(prev + 1, questions.length - 1));
    if (pageNum === questions.length - 1) {
      setHasFinished(true);
    }
  };
  useEffect(() => {
    if (hasFinished) {
      dispatch({ type: ReducerActions.setMCQQuestions, payload: questions });
      navigation.replace(ScreenNames.REVIEW_MCQ);
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
  };

  const handleAnswer = (asnweredCorrectly, selectedIndices) => {
    setDirty(true);
    setQuestions((prev) => {
      const newStoredAnswers = [...prev];
      newStoredAnswers[pageNum] = {
        ...newStoredAnswers[pageNum],
        ...initialQuestionState,
        isCorrect: asnweredCorrectly,
        isAlreadyAnswered: true,
        chosenIndices: selectedIndices,
      };
      return newStoredAnswers;
    });
  };

  const handleSkip = () => {
    setCurrentQuestionToSkipped();
    incrementPage();
  };
  useOnGoBack(
    (e) => {
      if (!dirty || hasFinished) {
        return;
      }

      e.preventDefault();

      LoseProgressAlert(t, () => navigation.dispatch(e.data.action));
    },
    [dirty, hasFinished]
  );

  return (
    <Page>
      <MaterialViewHeader
        onBackPress={() => navigation.goBack()}
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
        progress={
          (pageNum + 1 * questions[pageNum].isAlreadyAnswered) /
          questions.length
        }
        color={Colors.accent}
      />
      <NavMaterials
        onPressNext={incrementPage}
        onPressBack={decrementPage}
        onPressPageNum={(num) => setPageNum(num)}
        currentPageIndex={pageNum}
        maxPages={questions.length}
      />
      <McqQuestion
        question={questions[pageNum]}
        questionIndex={pageNum}
        isAlreadyAnswered={questions[pageNum].isAlreadyAnswered}
        isLastQuestion={pageNum === questions.length - 1}
        handleAnswerShown={handleAnswerShown}
        handleAnswer={handleAnswer}
        handleSkip={handleSkip}
        handleContinue={incrementPage}
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
