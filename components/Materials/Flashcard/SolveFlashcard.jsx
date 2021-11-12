import MaterialViewHeader from 'common/MaterialHeader/MaterialViewHeader';
import Page from 'common/Page/Page';
import { navigationPropType } from 'proptypes';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Colors } from 'styles';
import NavMaterials from '../_common/NavMaterials';
import Flashcard from './Flashcard';
import FlashcardFooter from './FlashcardFooter';

const SolveFlashcard = ({ navigation }) => {
  const x = 0;
  const [isFlipped, setIsFlipped] = useState(false);
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
      <ProgressBar progress={0.2} color={Colors.accent} />
      <NavMaterials onPressNext={() => {}} currentPageIndex={0} maxPages={2} />
      <Flashcard
        isFlipped={isFlipped}
        onGood={() => {}}
        onBad={() => {}}
        flashcard={{
          id: 7,
          frontText: 'Sad',
          backText:
            'Wants: \nThe form human needs take as they are shaped by culture and individual personality. \nShaped by society and marketing programs \n\n(racist example: American burger, Chinese rice)',
          frontImage: 'http://placekitten.com/100/300',
          backImage: 'http://placekitten.com/100/301',
        }}
        onFlip={() => setIsFlipped((prev) => !prev)}
      />
      <FlashcardFooter
        onGood={() => {}}
        onBad={() => {}}
        onFlip={() => setIsFlipped((prev) => !prev)}
      />
    </Page>
  );
};

SolveFlashcard.propTypes = {
  navigation: navigationPropType.isRequired,
};
SolveFlashcard.defaultProps = {};

export default SolveFlashcard;

const styles = StyleSheet.create({});
