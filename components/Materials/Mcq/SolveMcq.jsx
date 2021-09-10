import EduText from 'common/EduText';
import Page from 'common/Page/Page';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Constants } from 'styles';
import NavMaterials from '../_common/NavMaterials';
import McqQuestion from './McqQuestion';

const SolveMcq = () => {
  const [pageNum, setPageNum] = useState(5);
  const maxPages = 10;
  const incrementPage = () =>
    setPageNum((state) => Math.min(state + 1, maxPages - 1));
  const decrementPage = () => setPageNum((state) => Math.max(state - 1, 0));
  return (
    <Page style={styles.container}>
      <EduText>testtttt</EduText>
      <EduText>testtttt</EduText>
      <EduText>testtttt</EduText>
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
      <McqQuestion
        question={{
          id: 0,
          title:
            'Who is the first avenger in the MCU Marvel Cinematic Universe?',
          options: [
            'hi',
            'buy',
            'Loki—reael name: Loki Laufeyson. I know  that Loki’s last name is reflective of his noble birth, but I feel like I also knew an allergenic, bespectacled kid on my street growing up by the last Laufeyson. ',
            'Loki—raeal name: Loki  an allergenic, bespectacled kid on my street growing up by the last name of Laufeyson. ',
            // 'Loki—raeal name: Loki Laufeyson. I know that Loki’s last name is reflective of his noble birth, but I feel like I also knew an allergenic, bespectacled kid on my street growing up by the last name of Laufeyson. ',
            // 'Loki—real name: Loki Laufeyson. I know that Loki’s last name is reflective of his noble birth, but I feel like I also knew an allergenic, bespectacled kid on my street growing up by the last name of Laufeyson. ',
          ],
          answerIndices: [0, 2],
        }}
        questionIndex={4}
      />
    </Page>
  );
};

SolveMcq.propTypes = {};
SolveMcq.defaultProps = {};

export default SolveMcq;

const styles = StyleSheet.create({
  container: {
    padding: Constants.commonMargin,
  },
});
