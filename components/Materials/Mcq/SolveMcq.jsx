import Page from 'common/Page/Page';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Constants } from 'styles';
import NavMaterials from '../_common/NavMaterials';
import McqQuestion from './McqQuestion';

const QUESTIONS = [
  {
    id: 0,
    title: 'choose the correct ans',
    imageURI:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDO6fu_ZbHOGVK-07zGC0RBubRtEr4ClOU0A&usqp=CAU',
    options: ['ans 1', 'ans 2', 'ans 3', 'ans 4'],
    answerIndices: [0, 3],
  },
  {
    id: 1,
    title: 'choose the صخ ans',
    options: [
      'ans 1',
      'ans 2',
      'ans 3',
      'ans 4',
      'yo',
      // 'Loki—reael name: Loki Laufeyson. I know  that Loki’s last name is reflective of his noble birth, but I feel like I also knew an allergenic, bespectacled kid on my street growing up by the last Laufeyson. ',
      // 'Loki—raeal name: Loki  an allergenic, bespectacled kid on my street growing up by the last name of Laufeyson. ',
      'Loki—raeal name: Loki Laufeyson. I bespectacled kid on my street growing up by the last name of Laufeyson. ',
      // 'Loki—real name: Loki Laufeyson. I know that Loki’s last name is reflective of his noble birth, but I feel like I also knew an allergenic, bespectacled kid on my street growing up by the last name of Laufeyson. ',
    ],
    answerIndices: [0, 3],
  },
  {
    id: 2,
    imageURI:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDO6fu_ZbHOGVK-07zGC0RBubRtEr4ClOU0A&usqp=CAU',
    options: [
      'Harry Potter',
      'The Chosen One',
      'The boy who lived',
      "Lily's son",
    ],
    answerIndices: [0],
  },
  {
    id: 3,
    title: 'choose the correct ans',
    options: [
      'hi',
      'buy',
      'سيش',
      'ssad',
      'sad',
      'yo',
      // 'Loki—reael name: Loki Laufeyson. I know  that Loki’s last name is reflective of his noble birth, but I feel like I also knew an allergenic, bespectacled kid on my street growing up by the last Laufeyson. ',
      // 'Loki—raeal name: Loki  an allergenic, bespectacled kid on my street growing up by the last name of Laufeyson. ',
      'Loki—raeal name: Loki Laufeyson. I bespectacled kid on my street growing up by the last name of Laufeyson. ',
      // 'Loki—real name: Loki Laufeyson. I know that Loki’s last name is reflective of his noble birth, but I feel like I also knew an allergenic, bespectacled kid on my street growing up by the last name of Laufeyson. ',
    ],
    answerIndices: [0, 3],
  },
];

const SolveMcq = () => {
  const [pageNum, setPageNum] = useState(0);
  const maxPages = QUESTIONS.length;
  const incrementPage = () =>
    setPageNum((state) => Math.min(state + 1, maxPages - 1));
  const decrementPage = () => setPageNum((state) => Math.max(state - 1, 0));
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

SolveMcq.propTypes = {};
SolveMcq.defaultProps = {};

export default SolveMcq;

const styles = StyleSheet.create({
  header: {
    padding: Constants.commonMargin,
  },
});
