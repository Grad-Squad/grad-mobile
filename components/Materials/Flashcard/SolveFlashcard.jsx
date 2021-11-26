import MaterialViewHeader from 'common/MaterialHeader/MaterialViewHeader';
import Page from 'common/Page/Page';
import { navigationPropType } from 'proptypes';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Colors } from 'styles';
import NavMaterials from '../_common/NavMaterials';
import Flashcard from './Flashcard';
import FlashcardFooter from './FlashcardFooter';

const SolveFlashcard = ({ navigation }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  // todo usecallback for onGood, onBad
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
        <ProgressBar progress={0.2} color={Colors.accent} />
        <NavMaterials
          onPressNext={() => {}}
          currentPageIndex={0}
          maxPages={2}
        />
      </View>

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
        unavailableHeight={headerHeight + footerHeight}
      />

      <View
        onLayout={(event) => setFooterHeight(event.nativeEvent.layout.height)}
      >
        <FlashcardFooter
          onGood={() => {}}
          onBad={() => {}}
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
