import EduText from 'common/EduText';
import Page from 'common/Page/Page';
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
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
          options: ['hi', 'buy'],
          answers: ['hi'],
        }}
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
    flex: 1,
  },
});
