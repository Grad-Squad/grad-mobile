import Page from 'common/Page/Page';
import { navigationPropType } from 'proptypes';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Constants, Colors } from 'styles';
import { ProgressBar } from 'react-native-paper';
import MaterialViewHeader from 'common/MaterialHeader/MaterialViewHeader';
import NavMaterials from '../_common/NavMaterials';
import McqQuestion from './McqQuestion';
import QUESTIONS from './TEMP_DATA';

const SolveMcq = ({ navigation }) => {
  const [pageNum, setPageNum] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);
  const maxPages = QUESTIONS.length;
  const [storedAnswers, setStoredAnswers] = useState(() =>
    QUESTIONS.map(() => ({
      isCorrect: false,
      isSkipped: false,
      isAnswerShown: false,
      isAlreadyAnswered: false,
    }))
  );

  const decrementPage = () => setPageNum((state) => Math.max(state - 1, 0));
  const incrementPage = () => {
    setPageNum((state) => Math.min(state + 1, maxPages - 1));
    if (pageNum === maxPages - 1) {
      setHasFinished(true);
    }
  };

  useEffect(() => {
    if (hasFinished) {
      navigation.navigate('reviewMcq', { storedAnswers });
    }
  }, [hasFinished]);

  const handleAnswerShown = () => {
    setStoredAnswers((state) => {
      const newStoredAnswers = [...state];
      newStoredAnswers[pageNum] = {
        ...newStoredAnswers[pageNum],
        isCorrect: false,
        isAnswerShown: true,
        isAlreadyAnswered: true,
        isSkipped: false,
      };
      return newStoredAnswers;
    });
    incrementPage();
  };

  const handleAnswer = (asnweredCorrectly) => {
    setStoredAnswers((state) => {
      const newStoredAnswers = [...state];
      newStoredAnswers[pageNum] = {
        ...newStoredAnswers[pageNum],
        isCorrect: asnweredCorrectly,
        isAlreadyAnswered: true,
        isSkipped: false,
      };
      return newStoredAnswers;
    });
    incrementPage();
  };

  const handleSkip = () => {
    setStoredAnswers((state) => {
      const newStoredAnswers = [...state];
      newStoredAnswers[pageNum] = {
        ...newStoredAnswers[pageNum],
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
      <ProgressBar progress={(pageNum + 1) / maxPages} color={Colors.accent} />
      <View style={styles.navMaterials}>
        <NavMaterials
          onPressNext={incrementPage}
          onPressBack={decrementPage}
          onPressPageNum={(num) => setPageNum(num)}
          currentPageIndex={pageNum}
          maxPages={maxPages}
        />
      </View>
      <McqQuestion
        question={QUESTIONS[pageNum]}
        questionIndex={pageNum}
        isAlreadyAnswered={storedAnswers[pageNum].isAlreadyAnswered}
        isLastQuestion={pageNum === QUESTIONS.length - 1}
        handleAnswerShown={handleAnswerShown}
        handleAnswer={handleAnswer}
        handleSkip={handleSkip}
      />
    </Page>
  );
};

SolveMcq.propTypes = {
  navigation: navigationPropType.isRequired,
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
