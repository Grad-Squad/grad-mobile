import Page from 'common/Page/Page';
import { navigationPropType } from 'proptypes';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Constants } from 'styles';
import NavMaterials from '../_common/NavMaterials';
import McqQuestion from './McqQuestion';
import QUESTIONS from './TEMP_DATA';

const SolveMcq = ({ navigation }) => {
  const [pageNum, setPageNum] = useState(0);
  const maxPages = QUESTIONS.length;
  const [storedAnswers, setStoredAnswers] = useState(() =>
    QUESTIONS.map(() => ({
      isCorrect: false,
      isSkipped: true,
      isAlreadyAnswered: false,
    }))
  );

  const decrementPage = () => setPageNum((state) => Math.max(state - 1, 0));
  const incrementPage = () => {
    setPageNum((state) => Math.min(state + 1, maxPages - 1));
  };

  return (
    <Page>
      <View style={styles.header}>
        <NavMaterials
          onPressNext={incrementPage}
          maxPages={maxPages}
          currentPageIndex={pageNum}
        />
        <NavMaterials
          onPressNext={() => {}}
          onPressBack={() => {}}
          maxPages={maxPages}
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
        isAlreadyAnswered={false}
        handleAnswer={() => {
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
