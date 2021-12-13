import MaterialViewHeader from 'common/MaterialHeader/MaterialViewHeader';
import Page from 'common/Page/Page';
import { navigationPropType } from 'proptypes';
import React, { useState, useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Colors } from 'styles';
import NavMaterials from '../_common/NavMaterials';
import Flashcard from './Flashcard';
import FlashcardFooter from './FlashcardFooter';

const SolveFlashcard = ({ navigation }) => {
  const { data: flashcards, title } = useSelector(
    (state) => state.material.openMaterialData
  );
  const materialOwner = useSelector((state) => state.material.materialOwner);

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

  const onGoToCard = (num) => {
    setCardIndex(num);
    setIsFlipped(false);
  };

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
    setFlashcardStates(flashStates);
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
    setFlashcardStates(flashStates);
    onNext();
  }, [cardIndex, flashcardStates, onNext]);

  return (
    <Page>
      <View
        onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
      >
        <MaterialViewHeader
          onBackPress={() => navigation.goBack()}
          author={materialOwner?.name}
          title={title}
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
          onPressPageNum={onGoToCard}
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
