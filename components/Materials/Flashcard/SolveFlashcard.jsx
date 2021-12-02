import MaterialViewHeader from 'common/MaterialHeader/MaterialViewHeader';
import Page from 'common/Page/Page';
import { navigationPropType } from 'proptypes';
import React, { useState, useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Colors } from 'styles';
import NavMaterials from '../_common/NavMaterials';
import Flashcard from './Flashcard';
import FlashcardFooter from './FlashcardFooter';

const flashcards = [];
for (let i = 0; i < 5; i += 1) {
  flashcards.push({
    id: 7,
    frontText: 'Sad',
    backText:
      'Wants: \nThe form human needs take as they are shaped by culture and individual personality. \nShaped by society and marketing programs \n\n(racist example: American burger, Chinese rice)',
    frontImage: `http://placekitten.com/100/${300 + 40 * i}`,
    backImage: `http://placekitten.com/100/${302 + 40 * i}`,
  });
}

const SolveFlashcard = ({ navigation }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [flashcardStates, setFlashcardStates] = useState(() =>
    Array.from(Array(flashcards.length)).map(() => ({
      isEasy: false,
      solved: false,
      isHard: false,
    }))
  );
  const [cardIndex, setCardIndex] = useState(0);

  const onNext = useCallback(() => {
    setCardIndex((prev) => Math.min(prev + 1, flashcards.length - 1));
    setIsFlipped(false);
  }, [setCardIndex]);

  const onPrev = useCallback(() => {
    setCardIndex((prev) => Math.max(prev - 1, 0));
    setIsFlipped(false);
  }, [setCardIndex]);

  const onGood = useCallback(() => {
    const flashStates = [...flashcardStates];
    flashStates[cardIndex] = {
      ...flashStates[cardIndex],
      solved: true,
      isEasy: true,
      isHard: false,
    };
    onNext();
  }, [cardIndex, flashcardStates, onNext]);

  const onBad = useCallback(() => {
    const flashStates = [...flashcardStates];
    flashStates[cardIndex] = {
      ...flashStates[cardIndex],
      solved: true,
      isEasy: false,
      isHard: true,
    };
    onNext();
  }, [cardIndex, flashcardStates, onNext]);

  return (
    <Page>
      <View
        onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
      >
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
          color={Colors.accent}
          progress={cardIndex / flashcards.length}
        />
        <NavMaterials
          onPressNext={onNext}
          onPressBack={onPrev}
          currentPageIndex={cardIndex}
          maxPages={flashcards.length}
        />
      </View>

      <Flashcard
        isFlipped={isFlipped}
        onGood={onGood}
        onBad={onBad}
        flashcard={flashcards[cardIndex]}
        onFlip={() => setIsFlipped((prev) => !prev)}
        unavailableHeight={headerHeight + footerHeight}
      />

      <View
        onLayout={(event) => setFooterHeight(event.nativeEvent.layout.height)}
      >
        <FlashcardFooter
          onGood={onGood}
          onBad={onBad}
          onFlip={() => setIsFlipped((prev) => !prev)}
        />
      </View>
    </Page>
  );
};

SolveFlashcard.propTypes = {
  navigation: navigationPropType.isRequired,
};
SolveFlashcard.defaultProps = {};

export default SolveFlashcard;

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({});
