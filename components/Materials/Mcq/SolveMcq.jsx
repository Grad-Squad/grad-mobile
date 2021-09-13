import Page from 'common/Page/Page';
import { navigationPropType } from 'proptypes';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Constants } from 'styles';
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

  return (
    <Page>
      <View style={styles.header}>
        <NavMaterials
          onPressNext={incrementPage}
          maxPages={maxPages}
          currentPageIndex={pageNum}
        />
        <NavMaterials
          onPressNext={incrementPage}
          onPressBack={decrementPage}
          isPageNumPressable
          currentPageIndex={pageNum}
          maxPages={maxPages}
        />
      </View>
      <McqQuestion
        question={QUESTIONS[pageNum]}
        questionIndex={pageNum}
        isAlreadyAnswered={storedAnswers[pageNum].isAlreadyAnswered}
        isLastQuestion={pageNum === QUESTIONS.length - 1}
        handleAnswer={(asnweredCorrectly) => {
          setStoredAnswers((state) => {
            const newStoredAnswers = [...state];
            newStoredAnswers[pageNum] = {
              isCorrect: asnweredCorrectly,
              isAlreadyAnswered: true,
              isSkipped: false,
            };
            return newStoredAnswers;
          });
          incrementPage();
        }}
        handleSkip={() => {
          setStoredAnswers((state) => {
            const newStoredAnswers = [...state];
            newStoredAnswers[pageNum] = {
              ...newStoredAnswers[pageNum],
              isSkipped: true,
            };
            return newStoredAnswers;
          });
          incrementPage();
        }}
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
  header: {
    padding: Constants.commonMargin,
  },
});
